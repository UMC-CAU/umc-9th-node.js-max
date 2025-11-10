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
  listStoreReviews,
  listMyReviews,
  listRestaurantMissions,
  listMyMissions,
} from "../services/user.service.js";
import {missionComplete} from "../repositories/user.repository.js"

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

export const handleRestaurantAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("음식점 추가를 요청했습니다!");
  console.log("body:", req.body);

  const restaurant: any = await restaurantAdd(bodyToRestaurant(req.body));
  res.status(StatusCodes.OK).success(restaurant);
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
  res.status(StatusCodes.OK).success(review);
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
  res.status(StatusCodes.OK).success(mission);
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
  res.status(StatusCodes.OK).success(userMission);
};

export const handleListStoreReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
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

export const handleListRestaurantMissions = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviews = await listRestaurantMissions(
    parseInt(req.params.restaurantId)
  );
  res.status(StatusCodes.OK).success(reviews);
}//특정 가게 미션 목록 핸들러

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