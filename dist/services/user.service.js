import { responseFromUser, } from "../dtos/user.dto.js";
import { responseFromReviews, responseFromMissions, } from "../dtos/restaurant.dto.js";
import { DuplicateUserEmailError, UserUpdateFailedError, } from "../errors.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference, updateUserInfo } from "../repositories/user.repository.js";
import { getUserMissions } from "../repositories/userMission.repository.js";
import { getMyReviews } from "../repositories/review.repository.js";
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
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }
    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }
    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);
    return responseFromUser({ user, preferences });
};
export const listMyReviews = async (userId) => {
    const reviews = await getMyReviews(userId);
    return responseFromReviews(reviews); //responseFromReviews 재사용
}; //내가 작성한 리뷰 리스트 선택 로직
export const listMyMissions = async (userId) => {
    const missions = await getUserMissions(userId);
    return responseFromMissions(missions);
};
export const updateUserInfoService = async (userInfo, userId) => {
    const user = await getUser(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
    userInfo.password = hashedPassword;
    user.password = user.password;
    const updatedUserId = await updateUserInfo(userInfo, userId);
    if (updatedUserId === null) {
        throw new UserUpdateFailedError("업데이트에 실패했습니다.", userInfo);
    }
    return updatedUserId;
};
