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
    regionId: body.regionId, // 필수
  };
};

// 음식점 추가 응답 dto
interface RestaurantRow {
  id: number;
  name: string;
  address: string;
  region: { region: string };
  foodCategory: { name: string };
}

export const responseFromRestaurant = ({
  restaurant,
}: {
  restaurant: RestaurantRow;
}) => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    region: restaurant.region.region,
    restaurantCategory: restaurant.foodCategory.name,
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
    restaurantId:
      typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
    userId: body.userId, //필수
    rate: body.rate, //필수
    reviewText: body.reviewText, //필수
    image: body.image || "", //선택
  };
};

// 리뷰 작성 응답 dto
interface ReviewRow {
  restaurantId: number;
  restaurant: { name: string };
  rate: number;
  reviewText: string;
}

export const responseFromReview = ({ review }: { review: ReviewRow }) => {
  return {
    restaurantId: review.restaurantId,
    restaurantName: review.restaurant.name,
    rate: review.rate,
    reviewText: review.reviewText,
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
    restaurantId:
      typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
    minCost: body.minCost, //필수
    deadline: new Date(body.deadline), //필수
  };
};

// 미션 추가 응답 dto
interface MissionRow {
  restaurantId: number;
  restaurant: { name: string };
  minCost: number;
  deadline: Date;
}

export const responseFromMission = ({ mission }: { mission: MissionRow }) => {
  return {
    restaurantId: mission.restaurantId,
    restaurantName: mission.restaurant.name,
    minCost: mission.minCost,
    deadline: mission.deadline,
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
  missionId: number;
  userId: number;
  startingDay: Date;
}

export const responseFromUserMission = ({
  userMission,
}: {
  userMission: UserMissionRow;
}) => {
  return {
    id: userMission.id,
    missionId: userMission.missionId,
    userId: userMission.userId,
    startingDay: userMission.startingDay,
  };
};

interface reviews {
  id: number;
  reviewText: number;
  restaurantId: number;
  userId: number;
  restaurant: { name: string };
  user: { name: string };
}

export const responseFromReviews = (reviews: reviews[]) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromMissions = (missions: MissionRow[]) => {
  return {
    data: missions,
  };
}

