import { prisma } from "../db.config.js";

export const getUserMission = async (
  userMissionId: number
): Promise<any | null> => {
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


export interface AddUserMissionData {
  missionId: number;
  userId: number;
}

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