// 유저미션 추가 요청 dto
export interface UserMissionRequestBody {
  userId: number;
}

export const bodyToUserMission = (
  body: UserMissionRequestBody,
  missionId: string | number
) => {
  return {
    userId: body.userId, //필수
    missionId: typeof missionId === "string" ? parseInt(missionId) : missionId, //필수
  };
};

// 유저미션 추가 응답 dto
interface UserMissionRow {
  id: number;
  missionId: number;
  userId: number;
  startingDay: Date;
}

export const responseFromUserMission = ({
  userMission,
}: {
  userMission: UserMissionRow;
}) => {
  return {
    id: userMission.id,
    missionId: userMission.missionId,
    userId: userMission.userId,
    startingDay: userMission.startingDay,
  };
};