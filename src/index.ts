import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import {
  handleUserSignUp,
  handleListMyReviews,
  handleListMyMissions,
  handleUserMissionComplete,
} from "./controllers/user.controller.js";

import {
  handleListStoreReviews,
  handleListRestaurantMissions,
  handleRestaurantAdd,
  handleReviewAdd
} from "./controllers/restaurant.controller.js";

import {
  handleMissionAdd
} from "./controllers/mission.controller.js";

import { handleUserMissionAdd } from "./controllers/userMission.controller.js";

dotenv.config();
const upload = multer({ dest: "uploads/" }); //이미지 업로드를 위한 multer 설정

const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
declare module "express-serve-static-core" {
  interface Response {
    success: (data: any) => Response;
    error: (params: { errorCode?: string; reason?: string | null; data?: any }) => Response;
  }
}

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(morgan("dev")); // HTTP 요청 로깅
app.use(cookieParser()); //쿠키 파싱 미들웨어

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); //특정 가게 리뷰 목록 엔드포인트

app.get("/api/v1/reviews/:userId", handleListMyReviews); //내가 작성한 리뷰 목록 엔드포인트

app.get(
  "/api/v1/restaurant/:restaurantId/missions",
  handleListRestaurantMissions
); //특정 가게 미션 목록 엔드포인트

app.get("/api/v1/missions/:userId", handleListMyMissions); //내가 진행 중인 미션 목록 엔드포인트

app.post("/api/v1/users/signup", handleUserSignUp); //회원가입 엔드포인트

app.post("/api/v1/restaurants/add", handleRestaurantAdd); //음식점 추가 엔드포인트

app.post("/api/v1/:restaurantId/review", upload.none(), handleReviewAdd); //리뷰 작성 엔드포인트

app.post("/api/v1/missions/:restaurantId/add", handleMissionAdd); //미션 추가 엔드포인트

app.post("/api/v1/user-missions/:missionId/add", handleUserMissionAdd); //유저미션 추가 엔드포인트

app.post("/api/v1/user-missions/complete", handleUserMissionComplete); //미션 진행완료

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
