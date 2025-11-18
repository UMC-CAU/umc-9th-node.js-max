import { StatusCodes } from "http-status-codes";
import { listStoreReviews, listRestaurantMissions, restaurantAdd, reviewAdd } from "../services/restaurant.service.js";
import { bodyToRestaurant, bodyToReview } from "../dtos/restaurant.dto.js";
export const handleListStoreReviews = async (req, res, next) => {
    /*
      #swagger.summary = '가게 리뷰 목록 조회 API';
      #swagger.parameters['storeId'] = {
        in: 'path',
        description: '가게 ID',
        required: true,
        type: 'integer'
      };
      #swagger.parameters['cursor'] = {
        in: 'query',
        description: '페이지네이션 커서 (마지막 리뷰 ID)',
        required: false,
        type: 'integer'
      };
      #swagger.responses[200] = {
        description: '가게 리뷰 목록 조회 성공 응답',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'SUCCESS' },
                error: { type: 'object', nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          reviewText: { type: "string" },
                          restaurantId: { type: "number" },
                          userId: { type: "number" },
                          restaurant: { type: "object", properties: { name: { type: "string" } } },
                          user: { type: "object", properties: { name: { type: "string" } } }
                        }
                      }
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        cursor: { type: "number", nullable: true }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
    */
    const reviews = await listStoreReviews(parseInt(req.params.storeId), typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
    res.status(StatusCodes.OK).success(reviews);
};
export const handleListRestaurantMissions = async (req, res, next) => {
    /*
      #swagger.summary = '특정 가게의 미션 목록 조회 API';
      #swagger.parameters['restaurantId'] = {
        in: 'path',
        description: '음식점 ID',
        required: true,
        type: 'integer'
      };
      #swagger.responses[200] = {
        description: '가게 미션 목록 조회 성공',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          restaurantId: { type: "number" },
                          restaurant: { type: "object", properties: { name: { type: "string" } } },
                          minCost: { type: "number" },
                          deadline: { type: "string", format: "date-time" }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
    */
    const reviews = await listRestaurantMissions(parseInt(req.params.restaurantId));
    res.status(StatusCodes.OK).success(reviews);
}; //특정 가게 미션 목록 핸들러
export const handleRestaurantAdd = async (req, res, next) => {
    /*
      #swagger.summary = '음식점 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", description: "음식점 이름" },
                address: { type: "string", description: "음식점 주소" },
                categoryId: { type: "number", description: "카테고리 ID" },
                regionId: { type: "number", description: "지역 ID" }
              },
              required: ["name", "address"]
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: '음식점 추가 성공',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" },
                    region: { type: "string" },
                    restaurantCategory: { type: "string" }
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: '음식점 추가 실패',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "R001" },
                    reason: { type: "string", example: "음식점 추가에 실패했습니다." },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */
    console.log("음식점 추가를 요청했습니다!");
    console.log("body:", req.body);
    const restaurant = await restaurantAdd(bodyToRestaurant(req.body));
    res.status(StatusCodes.OK).success(restaurant);
};
export const handleReviewAdd = async (req, res, next) => {
    /*
      #swagger.summary = '리뷰 작성 API';
      #swagger.parameters['restaurantId'] = {
        in: 'path',
        description: '음식점 ID',
        required: true,
        type: 'integer'
      };
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "number", description: "사용자 ID" },
                content: { type: "string", description: "리뷰 내용" },
                rating: { type: "number", description: "평점 (1-5)" }
              },
              required: ["userId", "content", "rating"]
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: '리뷰 작성 성공',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    restaurantId: { type: "number" },
                    restaurantName: { type: "string" },
                    rate: { type: "number" },
                    reviewText: { type: "string" }
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[404] = {
        description: '존재하지 않는 음식점',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "R002" },
                    reason: { type: "string", example: "존재하지 않는 음식점입니다." },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body);
    console.log("params:", req.params);
    const review = await reviewAdd(bodyToReview(req.body, req.params.restaurantId));
    res.status(StatusCodes.OK).success(review);
};
