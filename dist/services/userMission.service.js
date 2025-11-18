import { responseFromUserMission, } from "../dtos/userMission.dto.js";
import { DuplicateMissionError } from "../errors.js";
import { addUserMission, getUserMission, } from "../repositories/userMission.repository.js";
// 유저미션 추가 로직
export const userMissionAdd = async (data) => {
    const userMissionId = await addUserMission({
        missionId: data.missionId,
        userId: data.userId,
    });
    if (userMissionId === null) {
        return new DuplicateMissionError("이미 추가한 미션입니다.", data);
    }
    console.log("userMissionId:", userMissionId);
    const userMission = await getUserMission(userMissionId);
    console.log(userMission);
    return responseFromUserMission({ userMission });
};
