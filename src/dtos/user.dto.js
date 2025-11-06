export const bodyToUser = (body) => {
    const birth = new Date(body.birth); //날짜 변환
    return {
        email: body.email, //필수
        password: body.password, //필수
        name: body.name, // 필수
        gender: body.gender, // 필수
        birth: birth, // 필수
        address: body.address || "", //선택
        detailAddress: body.detailAddress || "", //선택
        phoneNumber: body.phoneNumber, //필수
        preferences: body.preferences, // 필수
    };
};
export const responseFromUser = ({ user, preferences, }) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
        phoneNumber: user.phone_number,
        preferences: preferences.map((pref) => pref.foodCategory.name),
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
export const responseFromRestaurant = ({ restaurant, }) => {
    return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        region: restaurant.region.region,
        restaurantCategory: restaurant.foodCategory.name,
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
export const responseFromReview = ({ review }) => {
    return {
        restaurantId: review.restaurantId,
        restaurantName: review.restaurant.name,
        rate: review.rate,
        reviewText: review.reviewText,
    };
};
export const bodyToMission = (body, restaurantId) => {
    return {
        restaurantId: typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
        minCost: body.minCost, //필수
        deadline: new Date(body.deadline), //필수
    };
};
export const responseFromMission = ({ mission }) => {
    return {
        restaurantId: mission.restaurantId,
        restaurantName: mission.restaurant.name,
        minCost: mission.minCost,
        deadline: mission.deadline,
    };
};
export const bodyToUserMission = (body, missionId) => {
    return {
        userId: body.userId, //필수
        missionId: typeof missionId === "string" ? parseInt(missionId) : missionId, //필수
    };
};
export const responseFromUserMission = ({ userMission, }) => {
    return {
        id: userMission.id,
        missionId: userMission.missionId,
        userId: userMission.userId,
        startingDay: userMission.startingDay,
    };
};
export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};
export const responseFromMissions = (missions) => {
    return {
        data: missions,
    };
};
