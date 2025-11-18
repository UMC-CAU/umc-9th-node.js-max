import { prisma } from "../db.config.js";
export const getRestaurantMissions = async (restaurantId) => {
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
}; //특정 가게 미션 목록 선택
export const addMission = async (data) => {
    const mission = await prisma.mission.create({
        data: {
            restaurantId: data.restaurantId,
            minCost: data.minCost,
            deadline: data.deadline,
        },
    });
    return mission.id;
}; //미션 데이터 삽입
export const getMission = async (missionId) => {
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
