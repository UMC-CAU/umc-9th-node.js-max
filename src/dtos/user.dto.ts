// 회원가입 요청 dto
export interface UserRequestBody {
  email: string;
  password: string;
  name: string;
  gender: string;
  birth: string;
  address?: string;
  detailAddress?: string;
  phoneNumber: string;
  preferences: number[]; // 음식 카테고리 ID 배열이라고 가정
}

export const bodyToUser = (body: UserRequestBody) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수
    password: body.password, //필수
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth: birth, // 필수
    address: body.address || "", //선택
    detailAddress: body.detailAddress || "", //선택
    phoneNumber: body.phoneNumber, //필수
    preferences: body.preferences, // 필수
  };
};

// 회원가입 응답 dto
interface User {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phone_number: string;
}

interface PreferenceRow {
  userId: number;
  foodCategoryId: number;
  foodCategory: {
    id: number;
    name: string;
  };
}

export const responseFromUser = ({
  user,
  preferences,
}: {
  user: User;
  preferences: PreferenceRow[];
}) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detailAddress,
    phoneNumber: user.phone_number,
    preferences: preferences.map((pref) => pref.foodCategory.name),
  };
};



