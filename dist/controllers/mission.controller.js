import { StatusCodes } from "http-status-codes";
import { missionAdd } from "../services/mission.sevice.js";
import { bodyToMission } from "../dtos/mission.dto.js";
export const handleMissionAdd = async (req, res, next) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const mission = await missionAdd(bodyToMission(req.body, req.params.restaurantId));
    res.status(StatusCodes.OK).success(mission);
};
