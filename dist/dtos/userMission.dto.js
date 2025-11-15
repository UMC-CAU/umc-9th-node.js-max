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
