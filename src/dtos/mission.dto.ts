// 미션 추가 요청 dto
export interface MissionRequestBody {
  minCost: number;
  deadline: string;
}

export const bodyToMission = (
  body: MissionRequestBody,
  restaurantId: string | number
) => {
  return {
    restaurantId:
      typeof restaurantId === "string" ? parseInt(restaurantId) : restaurantId, //필수
    minCost: body.minCost, //필수
    deadline: new Date(body.deadline), //필수
  };
};

// 미션 추가 응답 dto
interface MissionRow {
  restaurantId: number;
  restaurant: { name: string };
  minCost: number;
  deadline: Date;
}

export const responseFromMission = ({ mission }: { mission: MissionRow }) => {
  return {
    restaurantId: mission.restaurantId,
    restaurantName: mission.restaurant.name,
    minCost: mission.minCost,
    deadline: mission.deadline,
  };
};