import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToRestaurant, bodyToReview, bodyToMission, bodyToUserMission } from "../dtos/user.dto.js";
import { userSignUp, restaurantAdd, reviewAdd, missionAdd, userMissionAdd } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};


export const handleRestaurantAdd = async (req, res, next) => {
  console.log("음식점 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const restaurant = await restaurantAdd(bodyToRestaurant(req.body));
  res.status(StatusCodes.OK).json({ result: restaurant });
}

export const handleReviewAdd = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  console.log("params:", req.params); // 값이 잘 들어오나 확인하기 위한 테스트용
  const review = await reviewAdd(bodyToReview(req.body, req.params.restaurantId));
  res.status(StatusCodes.OK).json({ result: review });
};

export const handleMissionAdd = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  console.log("params:", req.params); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await missionAdd(bodyToMission(req.body, req.params.restaurantId));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleUserMissionAdd = async (req, res, next) => {
  console.log("유저 미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  console.log("params:", req.params); // 값이 잘 들어오나 확인하기 위한 테스트용

  const userMission = await userMissionAdd(bodyToUserMission(req.body, req.params.missionId));
  res.status(StatusCodes.OK).json({ result: userMission });
};