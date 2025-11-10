import { pool, prisma } from "../db.config.js";

// 타입 인터페이스
export interface AddUserData {
  email: string;
  name: string;
  password: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface AddRestaurantData {
  name: string;
  categoryId: number;
  address: string;
  regionId: number;
}

export interface AddMissionData {
  restaurantId: number;
  minCost: number;
  deadline: Date;
}

export interface AddUserMissionData {
  missionId: number;
  userId: number;
}

// User 데이터 삽입
export const addUser = async (data: AddUserData): Promise<number | null> => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId: number): Promise<any[] | null> => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  console.log(user);
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (
  userId: number,
  foodCategoryId: number
): Promise<void> => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (
  userId: number
): Promise<any[]> => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });
  return preferences;
};

// 음식점 데이터 삽입
export const addRestaurant = async (
  data: AddRestaurantData
): Promise<number> => {
  const restaurant = await prisma.Restaurant.create({
    data: {
      name: data.name,
      foodCategoryId: data.categoryId,
      address: data.address,
      regionId: data.regionId,
    },
  });

  return restaurant.id;
}; //음식점 데이터 삽입

export const getRestaurant = async (
  restaurantId: number
): Promise<any[] | null> => {
  const restaurant = await prisma.restaurant.findUnique({
    select: {
      id: true,
      name: true,
      address: true,
      foodCategory: {
        select: {
          name: true, // food_category.name
        },
      },
      region: {
        select: {
          region: true, // region.name
        },
      },
    },
    where: { id: restaurantId },
  });
  return restaurant;
}; //음식점 정보 얻기

export interface AddReviewData {
  restaurantId: number;
  userId: number;
  rate: number;
  reviewText: string;
}

export const addReview = async (data: AddReviewData): Promise<number> => {
  const review = await prisma.review.create({
    data: {
      restaurantId: Number(data.restaurantId),
      userId: Number(data.userId),
      rate: Number(data.rate),
      reviewText: data.reviewText,
    },
  });
  return review.id;
}; //리뷰 데이터 삽입

export const getReview = async (reviewId: number): Promise<any[] | null> => {
  const review = prisma.review.findUnique({
    select: {
      restaurantId: true,
      restaurant: { select: { name: true } },
      rate: true,
      reviewText: true,
    },
    where: { id: reviewId },
  });
  return review;
}; //리뷰 정보 얻기

export const addMission = async (data: AddMissionData): Promise<number> => {
  const mission = await prisma.mission.create({
    data: {
      restaurantId: data.restaurantId,
      minCost: data.minCost,
      deadline: data.deadline,
    },
  });
  return mission.id;
}; //미션 데이터 삽입

export const getMission = async (missionId: number): Promise<any[] | null> => {
  const mission = await prisma.mission.findUnique({
    select: {
      restaurantId: true,
      restaurant: { select: { name: true } },
      minCost: true,
      deadline: true,
    },
    where: { id: missionId },
  });
  return mission;
}; //미션 정보 얻기

export const addUserMission = async (
  data: AddUserMissionData
): Promise<number | null> => {
  const existUserMission = await prisma.userMission.findFirst({
    select: {
      id: true,
    },
    where: {
      missionId: data.missionId,
      userId: data.userId,
    },
  });

  if (existUserMission) {
    return null;
  }

  const userMission = await prisma.userMission.create({
    data: {
      missionId: data.missionId,
      userId: data.userId,
      isClear: false,
      startingDay: new Date(),
    },
  });
  return userMission.id;
}; //유저 미션 데이터 삽입

export const getUserMission = async (
  userMissionId: number
): Promise<any[] | null> => {
  const userMission = await prisma.userMission.findUnique({
    select: {
      id: true,
      missionId: true,
      userId: true,
      startingDay: true,
    },
    where: {
      id: userMissionId,
    },
  });
  return userMission;
}; //유저 미션 정보 얻기

export const getAllStoreReviews = async (
  restaurantId: number,
  cursor: number
): Promise<any[]> => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      reviewText: true,
      restaurantId: true,
      userId: true,
      restaurant: { select: { name: true } },
      user: { select: { name: true } },
    },
    where: { restaurantId: restaurantId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};//특정 가게 리뷰 얻기

export const getMyReviews = async (userId: number): Promise<any[]> => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      reviewText: true,
      restaurantId: true,
      userId: true,
      restaurant: { select: { name: true } },
      user: { select: { name: true } },
    },
    where: { userId: userId },
    orderBy: { id: "asc" },
  });
  return reviews;
}; //내가 작성한 리뷰 목록 선택

export const getRestaurantMissions = async (
  restaurantId: number
): Promise<any[]> => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      restaurantId: true,
      restaurant: { select: { name: true } },
      minCost: true,
      deadline: true,
    },
    where: {
      restaurantId: restaurantId,
    },
    orderBy: { id: "asc" },
  });
  return missions;
};//특정 가게 미션 목록 선택

export const getUserMissions = async (userId: number): Promise<any[]> => {
  const userMission = await prisma.userMission.findMany({
    select: {
      id: true,
      missionId: true,
      userId: true,
      startingDay: true,
    },
    where: {
      userId: userId,
    },
  });
  return userMission;
};

export const missionComplete = async (
  userMissionId: number
): Promise<boolean> => {
  try {
    const userMission = await prisma.userMission.update({
      where: { id: userMissionId },
      data: { isClear: true },
    });
    return true;
  } catch (error) {
    console.error("업데이트 실패:", error);
    return false;
  }
};
