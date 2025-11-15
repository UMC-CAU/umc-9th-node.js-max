import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUserMission,} from "../dtos/userMission.dto.js";
import { userMissionAdd, } from "../services/userMission.service.js";

export const handleUserMissionAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("유저 미션 추가를 요청했습니다!");

  const userMission: any = await userMissionAdd(
    bodyToUserMission(req.body, req.params.missionId)
  );
  res.status(StatusCodes.OK).success(userMission);
};