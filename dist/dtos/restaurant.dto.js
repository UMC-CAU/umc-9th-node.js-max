export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};
export const bodyToRestaurant = (body) => {
    return {
        name: body.name, //필수
        categoryId: body.categoryId, // 필수
        address: body.address, // 필수
        regionId: body.regionId, // 필수
    };
};
export const responseFromMissions = (missions) => {
    return {
        data: missions,
    };
};
export const responseFromRestaurant = ({ restaurant, }) => {
    return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        region: restaurant.region.region,
        restaurantCategory: restaurant.foodCategory.name,
    };
};
export const responseFromReview = ({ review }) => {
    return {
        restaurantId: review.restaurantId,
        restaurantName: review.restaurant.name,
        rate: review.rate,
        reviewText: review.reviewText,
    };
};
export const bodyToReview = (body, restaurantId) => {
    return {
        restaurantId: typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
        userId: body.userId, //필수
        rate: body.rate, //필수
        reviewText: body.reviewText, //필수
        image: body.image || "", //선택
    };
};
