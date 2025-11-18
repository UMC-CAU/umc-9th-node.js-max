import { prisma } from "../db.config.js";

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

export interface AddMissionData {
  restaurantId: number;
  minCost: number;
  deadline: Date;
}

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

export const getMission = async (missionId: number): Promise<any | null> => {
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