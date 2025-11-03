import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  bodyToUser,
  bodyToRestaurant,
  bodyToReview,
  bodyToMission,
  bodyToUserMission,
} from "../dtos/user.dto.js";
import {
  userSignUp,
  restaurantAdd,
  reviewAdd,
  missionAdd,
  userMissionAdd,
} from "../services/user.service.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user: any = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleRestaurantAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("음식점 추가를 요청했습니다!");
  console.log("body:", req.body);

  const restaurant: any = await restaurantAdd(bodyToRestaurant(req.body));
  res.status(StatusCodes.OK).json({ result: restaurant });
};

export const handleReviewAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body);
  console.log("params:", req.params);

  const review: any = await reviewAdd(
    bodyToReview(req.body, req.params.restaurantId)
  );
  res.status(StatusCodes.OK).json({ result: review });
};

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
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleUserMissionAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("유저 미션 추가를 요청했습니다!");
  console.log("body:", req.body);
  console.log("params:", req.params);

  const userMission: any = await userMissionAdd(
    bodyToUserMission(req.body, req.params.missionId)
  );
  res.status(StatusCodes.OK).json({ result: userMission });
};

