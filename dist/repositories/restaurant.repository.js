import { prisma } from "../db.config.js";
// 음식점 데이터 삽입
export const addRestaurant = async (data) => {
    const restaurant = await prisma.restaurant.create({
        data: {
            name: data.name,
            foodCategoryId: data.categoryId,
            address: data.address,
            regionId: data.regionId,
        },
    });
    return restaurant.id;
}; //음식점 데이터 삽입
export const getRestaurant = async (restaurantId) => {
    const restaurant = await prisma.restaurant.findUnique({
        select: {
            id: true,
            name: true,
            address: true,
            foodCategory: {
                select: {
                    name: true, // food_category.name
                },
            },
            region: {
                select: {
                    region: true, // region.name
                },
            },
        },
        where: { id: restaurantId },
    });
    return restaurant;
}; //음식점 정보 얻기
