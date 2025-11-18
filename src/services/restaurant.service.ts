import {
  getAllStoreReviews,
  addReview,
  getReview,
} from "../repositories/review.repository.js";
import { getRestaurantMissions } from "../repositories/mission.repository.js";
import {
  addRestaurant,
  getRestaurant,
} from "../repositories/restaurant.repository.js";
import { RestaurantAddError, RestaurantNotFoundError } from "../errors.js";

import {
  responseFromReviews,
  responseFromMissions,
  responseFromRestaurant,
  responseFromReview,
} from "../dtos/restaurant.dto.js";

//리뷰 리스트 선택 로직
export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  return responseFromReviews(reviews);
};

export const listRestaurantMissions = async (restaurantId: number) => {
  const missions = await getRestaurantMissions(restaurantId);
  return responseFromMissions(missions);
};

// 음식점 추가 요청 타입
interface RestaurantData {
  name: string;
  categoryId: number;
  address: string;
  regionId: number;
}
// 음식점 추가 로직
export const restaurantAdd = async (data: RestaurantData): Promise<any> => {
  const addedRestaurantId = await addRestaurant({
    name: data.name,
    categoryId: data.categoryId,
    address: data.address,
    regionId: data.regionId,
  });

  if (addedRestaurantId === null) {
    throw new RestaurantAddError("음식점 추가에 실패했습니다.", data);
  }

  const restaurant = await getRestaurant(addedRestaurantId);

  return responseFromRestaurant({ restaurant });
};

// 리뷰 작성 요청 타입
interface ReviewData {
  restaurantId: number;
  userId: number;
  rate: number;
  reviewText: string;
  image?: string;
}

// 리뷰 추가 로직
export const reviewAdd = async (data: ReviewData): Promise<any> => {
  const restaurant = await getRestaurant(data.restaurantId); //음식점 존재 여부 확인

  if (restaurant === null) {
    throw new RestaurantNotFoundError("존재하지 않는 음식점입니다.", data);
  }

  const addedReviewId = await addReview({
    restaurantId: data.restaurantId,
    userId: data.userId,
    rate: data.rate,
    reviewText: data.reviewText,
  });

  const review = await getReview(addedReviewId);
  return responseFromReview({ review });
};
