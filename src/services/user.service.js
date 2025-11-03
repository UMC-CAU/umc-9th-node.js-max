import { responseFromUser, responseFromRestaurant, responseFromReview, responseFromMission, responseFromUserMission, } from "../dtos/user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference, addRestaurant, getRestaurant, addReview, getReview, addMission, getMission, addUserMission, getUserMission, } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
// 회원가입 로직
export const userSignUp = async (data) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        password: data.password,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
    });
    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }
    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }
    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);
    return responseFromUser({ user, preferences });
};
// 음식점 추가 로직
export const restaurantAdd = async (data) => {
    const addedRestaurantId = await addRestaurant({
        name: data.name,
        categoryId: data.categoryId,
        address: data.address,
        regionId: data.regionId,
    });
    if (addedRestaurantId === null) {
        throw new Error("음식점 추가에 실패했습니다.");
    }
    const restaurant = await getRestaurant(addedRestaurantId);
    return responseFromRestaurant({ restaurant });
};
// 리뷰 추가 로직
export const reviewAdd = async (data) => {
    const restaurant = await getRestaurant(data.restaurantId); //음식점 존재 여부 확인
    if (restaurant === null) {
        throw new Error("존재하지 않는 음식점입니다.");
    }
    const addedReviewId = await addReview({
        restaurantId: data.restaurantId,
        userId: data.userId,
        rate: data.rate,
        reviewText: data.reviewText,
        image: data.image || "",
    });
    console.log("addedReviewId:", addedReviewId);
    const review = await getReview(addedReviewId);
    return responseFromReview({ review });
};
// 미션 추가 로직
export const missionAdd = async (data) => {
    const missionId = await addMission({
        restaurantId: data.restaurantId,
        minCost: data.minCost,
        deadline: data.deadline,
    });
    console.log("missionId:", missionId);
    const mission = await getMission(missionId);
    return responseFromMission({ mission });
};
// 유저미션 추가 로직
export const userMissionAdd = async (data) => {
    const userMissionId = await addUserMission({
        missionId: data.missionId,
        userId: data.userId,
    });
    if (userMissionId === null) {
        return console.log("이미 추가한 미션입니다.");
    }
    console.log("userMissionId:", userMissionId);
    const userMission = await getUserMission(userMissionId);
    return responseFromUserMission({ userMission });
};
