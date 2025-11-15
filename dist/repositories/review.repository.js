import { prisma } from "../db.config.js";
export const getAllStoreReviews = async (restaurantId, cursor) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            reviewText: true,
            restaurantId: true,
            userId: true,
            restaurant: { select: { name: true } },
            user: { select: { name: true } },
        },
        where: { restaurantId: restaurantId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    return reviews;
}; //특정 가게 리뷰 얻기
export const getMyReviews = async (userId) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            reviewText: true,
            restaurantId: true,
            userId: true,
            restaurant: { select: { name: true } },
            user: { select: { name: true } },
        },
        where: { userId: userId },
        orderBy: { id: "asc" },
    });
    return reviews;
}; //내가 작성한 리뷰 목록 선택
export const addReview = async (data) => {
    const review = await prisma.review.create({
        data: {
            restaurantId: Number(data.restaurantId),
            userId: Number(data.userId),
            rate: Number(data.rate),
            reviewText: data.reviewText,
        },
    });
    return review.id;
}; //리뷰 데이터 삽입
export const getReview = async (reviewId) => {
    const review = await prisma.review.findUnique({
        select: {
            restaurantId: true,
            restaurant: { select: { name: true } },
            rate: true,
            reviewText: true,
        },
        where: { id: reviewId },
    });
    return review;
}; //리뷰 정보 얻기
