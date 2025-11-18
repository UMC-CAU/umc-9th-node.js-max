interface reviews {
  id: number;
  reviewText: string;
  restaurantId: number;
  userId: number;
  restaurant: { name: string };
  user: { name: string };
}

export const responseFromReviews = (reviews: reviews[]) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

// 음식점 추가 요청 dto
export interface RestaurantRequestBody {
  name: string;
  categoryId: number;
  address: string;
  regionId: number;
}

export const bodyToRestaurant = (body: RestaurantRequestBody) => {
  return {
    name: body.name, //필수
    categoryId: body.categoryId, // 필수
    address: body.address, // 필수
    regionId: body.regionId, // 필수
  };
};

// 미션 추가 응답 dto
interface MissionRow {
  restaurantId: number;
  restaurant: { name: string };
  minCost: number;
  deadline: Date;
}

export const responseFromMissions = (missions: MissionRow[]) => {
  return {
    data: missions,
  };
}

// 음식점 추가 응답 dto
interface RestaurantRow {
  id: number;
  name: string;
  address: string;
  region: { region: string };
  foodCategory: { name: string };
}

export const responseFromRestaurant = ({
  restaurant,
}: {
  restaurant: RestaurantRow;
}) => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    region: restaurant.region.region,
    restaurantCategory: restaurant.foodCategory.name,
  };
};
// 리뷰 작성 요청 dto

// 리뷰 작성 응답 dto
interface ReviewRow {
  restaurantId: number;
  restaurant: { name: string };
  rate: number;
  reviewText: string;
}

export const responseFromReview = ({ review }: { review: ReviewRow }) => {
  return {
    restaurantId: review.restaurantId,
    restaurantName: review.restaurant.name,
    rate: review.rate,
    reviewText: review.reviewText,
  };
};

export interface ReviewRequestBody {
  userId: number;
  rate: number;
  reviewText: string;
  image?: string;
}

export const bodyToReview = (
  body: ReviewRequestBody,
  restaurantId: string | number
) => {
  return {
    restaurantId:
      typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
    userId: body.userId, //필수
    rate: body.rate, //필수
    reviewText: body.reviewText, //필수
    image: body.image || "", //선택
  };
};