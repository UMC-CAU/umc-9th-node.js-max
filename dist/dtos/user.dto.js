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
export const bodyToReview = (body, restaurantId) => {
    return {
        restaurantId: typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
        userId: body.userId, //필수
        rate: body.rate, //필수
        reviewText: body.reviewText, //필수
        image: body.image || "", //선택
    };
};
