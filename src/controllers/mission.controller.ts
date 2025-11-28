import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  missionAdd
} from "../services/mission.sevice.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleMissionAdd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  /*
    #swagger.summary = '미션 추가 API';
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
              minCost: { type: "number", description: "최소 주문 금액" },
              deadline: { type: "string", format: "date", description: "마감일" }
            },
            required: ["minCost", "deadline"]
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: '미션 추가 성공',
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
                  minCost: { type: "number" },
                  deadline: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
  */
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body);
  console.log("params:", req.params);

  const mission: any = await missionAdd(
    bodyToMission(req.body, req.params.restaurantId)
  );
  res.status(StatusCodes.OK).success(mission);
};