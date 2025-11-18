import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listRestaurantMissions, restaurantAdd, reviewAdd } from "../services/restaurant.service.js";
import { bodyToRestaurant, bodyToReview } from "../dtos/restaurant.dto.js";
export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(parseInt(req.params.storeId), typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
    res.status(StatusCodes.OK).success(reviews);
};
export const handleListRestaurantMissions = async (req, res, next) => {
    const reviews = await listRestaurantMissions(parseInt(req.params.restaurantId));
    res.status(StatusCodes.OK).success(reviews);
}; //특정 가게 미션 목록 핸들러
export const handleRestaurantAdd = async (req, res, next) => {
    console.log("음식점 추가를 요청했습니다!");
    console.log("body:", req.body);
    const restaurant = await restaurantAdd(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).success(restaurant);
};
export const handleReviewAdd = async (req, res, next) => {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const review = await reviewAdd(bodyToReview(req.body, req.params.restaurantId));
    res.status(StatusCodes.OK).success(review);
};
