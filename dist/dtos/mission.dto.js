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
