import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  userSignUp,
  listMyReviews,
  listMyMissions,
} from "../services/user.service.js";
import { missionComplete } from "../repositories/user.repository.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              password: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  gender: { type: "string" },
                  birth: { type: "string", format: "date-time" },
                  address: { type: "string" },
                  detailAddress: { type: "string" },
                  phoneNumber: { type: "string" },
                  preferences: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
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
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user: any = await userSignUp(bodyToUser(req.body));
  console.log("user:", user);
  res.status(StatusCodes.OK).success(user);
};

export const handleListMyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    };
    #swagger.responses[200] = {
      description: '내가 작성한 리뷰 목록 조회 성공',
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
  const reviews = await listMyReviews(parseInt(req.params.userId));
  res.status(StatusCodes.OK).success(reviews);
}; //내가 작성한 리뷰 목록 핸들러

export const handleListMyMissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      type: 'integer'
    };
    #swagger.responses[200] = {
      description: '진행 중인 미션 목록 조회 성공',
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
  const missions = await listMyMissions(parseInt(req.params.userId));
  res.status(StatusCodes.OK).success(missions);
};

export const handleUserMissionComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /*
    #swagger.summary = '미션 진행 완료 처리 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userMissionId: { type: "number", description: "유저 미션 ID" }
            },
            required: ["userMissionId"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '미션 완료 처리 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: { type: "string", example: "완료" }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: '미션 완료 처리 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
                  reason: { type: "string", example: "미션완료 실패" },
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const completion: boolean = await missionComplete(req.body.userMissionId);
  if (completion) {
    res.status(StatusCodes.OK).success("완료");
  } else {
    res.status(StatusCodes.BAD_REQUEST).error({
      errorCode: "U002", //임의로 정한 코드
      reason: "미션완료 실패",
      data: null,
    });
  }
};
