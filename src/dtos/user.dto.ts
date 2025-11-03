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
  preferences: string[]; // 음식 카테고리 ID 배열이라고 가정
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
    preferences: body.preferences // 필수 
  };
};

// 회원가입 응답 dto
interface UserRow {
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
  food_category: string;
}

export const responseFromUser = ({
  user,
  preferences,
}: {
  user: UserRow[];
  preferences: PreferenceRow[];
}) => {
  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    gender: user[0].gender,
    birth: user[0].birth,     
    address: user[0].address,
    detailAddress: user[0].detailAddress,
    phoneNumber: user[0].phone_number,
    preferences: preferences.map((pref) => pref.food_category),
  };
};

// 음식점 추가 요청 dto
export interface RestaurantRequestBody {
  name: string;
  categoryId: number;
  address: string;
  regionId: number;
}

export const bodyToRestaurant = (body: RestaurantRequestBody) => {
  return {
    name: body.name, //필수 
    categoryId: body.categoryId, // 필수
    address: body.address, // 필수
    regionId: body.regionId // 필수
  };
};

// 음식점 추가 응답 dto
interface RestaurantRow {
  id: number;
  name: string;
  category: string;
  address: string;
}

export const responseFromRestaurant = ({
  restaurant,
}: {
  restaurant: RestaurantRow[];
}) => {
  return {
    id: restaurant[0].id,
    name: restaurant[0].name,
    category: restaurant[0].category,
    address: restaurant[0].address,
  };
};

// 리뷰 작성 요청 dto
export interface ReviewRequestBody {
  userId: number;
  rate: number;
  reviewText: string;
  image?: string;
}

export const bodyToReview = (
  body: ReviewRequestBody,
  restaurantId: string | number
) => {
  return { 
    restaurantId: typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
    userId: body.userId, //필수
    rate: body.rate, //필수
    reviewText: body.reviewText, //필수
    image: body.image || "" //선택
  };
};

// 리뷰 작성 응답 dto
interface ReviewRow {
  restaurant_id: number;
  name: string;
  rate: number;
  review_text: string;
  created_at: Date;
}

export const responseFromReview = ({
  review,
}: {
  review: ReviewRow[];
}) => {
  return {
    restaurantId: review[0].restaurant_id,
    restaurantName: review[0].name,
    rate: review[0].rate,
    reviewText: review[0].review_text,
    createdAt: review[0].created_at,
  };
};

// 미션 추가 요청 dto
export interface MissionRequestBody {
  minCost: number;
  deadline: string;
}

export const bodyToMission = (
  body: MissionRequestBody,
  restaurantId: string | number
) => {
  return {
    restaurantId: typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수 
    minCost: body.minCost, //필수
    deadline: new Date(body.deadline) //필수
  };
};

// 미션 추가 응답 dto
interface MissionRow {
  restaurant_id: number;
  name: string;
  min_cost: number;
  deadline: Date;
  created_at: Date;
}

export const responseFromMission = ({
  mission,
}: {
  mission: MissionRow[];
}) => {
  return {
    restaurantId: mission[0].restaurant_id,
    restaurantName: mission[0].name,
    minCost: mission[0].min_cost,
    deadline: mission[0].deadline,
    createdAt: mission[0].created_at,
  };
};

// 유저미션 추가 요청 dto
export interface UserMissionRequestBody {
  userId: number;
}

export const bodyToUserMission = (
  body: UserMissionRequestBody,
  missionId: string | number
) => {
  return {
    userId: body.userId, //필수
    missionId: typeof missionId === "string" ? parseInt(missionId) : missionId, //필수
  };
};

// 유저미션 추가 응답 dto
interface UserMissionRow {
  id: number;
  mission_id: number;
  user_id: number;
  starting_day: Date;
}

export const responseFromUserMission = ({
  userMission,
}: {
  userMission: UserMissionRow[];
}) => {
  return {
    id: userMission[0].id,  
    missionId: userMission[0].mission_id,
    userId: userMission[0].user_id, 
    startingDay: userMission[0].starting_day,
  };
};
