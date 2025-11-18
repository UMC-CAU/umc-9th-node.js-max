import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  missionAdd
} from "../services/mission.sevice.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleMissionAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body);
  console.log("params:", req.params);

  const mission: any = await missionAdd(
    bodyToMission(req.body, req.params.restaurantId)
  );
  res.status(StatusCodes.OK).success(mission);
};