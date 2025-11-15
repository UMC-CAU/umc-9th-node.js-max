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
