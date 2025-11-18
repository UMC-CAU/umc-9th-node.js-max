import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  bodyToUser,
} from "../dtos/user.dto.js";
import {
  userSignUp,
  listMyReviews,
  listMyMissions,
} from "../services/user.service.js";
import { missionComplete } from "../repositories/user.repository.js"

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user: any = await userSignUp(bodyToUser(req.body));
  console.log("user:", user);
  res.status(StatusCodes.OK).success(user);
};

export const handleListMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviews = await listMyReviews(
    parseInt(req.params.userId)
  );
  res.status(StatusCodes.OK).success(reviews);
};//내가 작성한 리뷰 목록 핸들러

export const handleListMyMissions = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const missions = await listMyMissions(
    parseInt(req.params.userId)
  );
  res.status(StatusCodes.OK).success(missions);
}

export const handleUserMissionComplete = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const completion:boolean = await missionComplete(req.body.userMissionId);
  if(completion){
    res.status(StatusCodes.OK).success("완료");
  } else {
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "U002",//임의로 정한 코드
      reason: "미션완료 실패",
      data: null
    });
  }

}