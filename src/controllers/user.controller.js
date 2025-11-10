import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToRestaurant, bodyToReview, bodyToMission, bodyToUserMission, } from "../dtos/user.dto.js";
import { userSignUp, restaurantAdd, reviewAdd, missionAdd, userMissionAdd, listStoreReviews, listMyReviews, listRestaurantMissions, listMyMissions, } from "../services/user.service.js";
import { missionComplete } from "../repositories/user.repository.js";
export const handleUserSignUp = async (req, res, next) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);
    const user = await userSignUp(bodyToUser(req.body));
    console.log("user:", user);
    res.status(StatusCodes.OK).success(user);
};
export const handleRestaurantAdd = async (req, res, next) => {
    console.log("음식점 추가를 요청했습니다!");
    console.log("body:", req.body);
    const restaurant = await restaurantAdd(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
};
export const handleReviewAdd = async (req, res, next) => {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const review = await reviewAdd(bodyToReview(req.body, req.params.restaurantId));
    res.status(StatusCodes.OK).json({ result: review });
};
export const handleMissionAdd = async (req, res, next) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const mission = await missionAdd(bodyToMission(req.body, req.params.restaurantId));
    res.status(StatusCodes.OK).json({ result: mission });
};
export const handleUserMissionAdd = async (req, res, next) => {
    console.log("유저 미션 추가를 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const userMission = await userMissionAdd(bodyToUserMission(req.body, req.params.missionId));
    res.status(StatusCodes.OK).json(userMission);
};
export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(parseInt(req.params.storeId), typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
    res.status(StatusCodes.OK).json(reviews);
};
export const handleListMyReviews = async (req, res, next) => {
    const reviews = await listMyReviews(parseInt(req.params.userId));
    res.status(StatusCodes.OK).json(reviews);
}; //내가 작성한 리뷰 목록 핸들러
export const handleListRestaurantMissions = async (req, res, next) => {
    const reviews = await listRestaurantMissions(parseInt(req.params.restaurantId));
    res.status(StatusCodes.OK).json(reviews);
}; //특정 가게 미션 목록 핸들러
export const handleListMyMissions = async (req, res, next) => {
    const missions = await listMyMissions(parseInt(req.params.userId));
    res.status(StatusCodes.OK).json(missions);
};
export const handleUserMissionComplete = async (req, res, next) => {
    const completion = await missionComplete(req.body.userMissionId);
    if (completion) {
        res.status(StatusCodes.OK).json("완료");
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json("실패");
    }
};
