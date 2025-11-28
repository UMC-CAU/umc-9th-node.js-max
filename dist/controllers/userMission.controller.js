import { StatusCodes } from "http-status-codes";
import { bodyToUserMission, } from "../dtos/userMission.dto.js";
import { userMissionAdd, } from "../services/userMission.service.js";
export const handleUserMissionAdd = async (req, res, next) => {
    /*
      #swagger.summary = '유저 미션 도전 API';
      #swagger.parameters['missionId'] = {
        in: 'path',
        description: '미션 ID',
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
                userId: { type: "number", description: "사용자 ID" }
              },
              required: ["userId"]
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: '유저 미션 도전 성공',
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
                    missionId: { type: "number" },
                    userId: { type: "number" },
                    startingDay: { type: "string", format: "date-time" }
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: '이미 도전한 미션',
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "M001" },
                    reason: { type: "string", example: "이미 추가한 미션입니다." },
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
    console.log("유저 미션 추가를 요청했습니다!");
    const userMission = await userMissionAdd(bodyToUserMission(req.body, req.params.missionId));
    res.status(StatusCodes.OK).success(userMission);
};
