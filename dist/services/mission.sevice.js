import { addMission, getMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";
// 미션 추가 로직
export const missionAdd = async (data) => {
    const missionId = await addMission({
        restaurantId: data.restaurantId,
        minCost: data.minCost,
        deadline: data.deadline,
    });
    console.log("missionId:", missionId);
    const mission = await getMission(missionId);
    return responseFromMission({ mission });
};
