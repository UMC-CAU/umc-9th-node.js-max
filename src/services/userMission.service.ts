import { responseFromUserMission, } from "../dtos/userMission.dto.js";
import{ DuplicateMissionError } from "../errors.js";
import {
  addUserMission,
  getUserMission,
} from "../repositories/userMission.repository.js";

// 유저미션 추가 요청 타입
interface UserMissionData {
  missionId: number;
  userId: number;
}

// 유저미션 추가 로직
export const userMissionAdd = async (data: UserMissionData): Promise<any> => {
  const userMissionId = await addUserMission({
    missionId: data.missionId,
    userId: data.userId,
  });

  if (userMissionId === null) {
    throw new DuplicateMissionError("이미 추가한 미션입니다.", data);
  }

  console.log("userMissionId:", userMissionId);

  const userMission = await getUserMission(userMissionId);
  console.log(userMission);
  return responseFromUserMission({ userMission });
};