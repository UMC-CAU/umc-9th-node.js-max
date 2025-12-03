import { prisma } from "../db.config.js";

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
export const getUser = async (userId: number): Promise<any | null> => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
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

export const missionComplete = async (
  userMissionId: number
): Promise<boolean> => {
  try {
    await prisma.userMission.update({
      where: { id: userMissionId },
      data: { isClear: true },
    });
    return true;
  } catch (error) {
    console.error("업데이트 실패:", error);
    return false;
  }
};

export const updateUserInfo = async (
  userInfo: AddUserData,
  userId: number
):Promise<number>  => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      email: userInfo.email,
      name: userInfo.name,
      password: userInfo.password,
      gender: userInfo.gender,
      birth: userInfo.birth,
      address: userInfo.address,
      detailAddress: userInfo.detailAddress,
      phoneNumber: userInfo.phoneNumber,
    },
  });
  return updated.id;
};