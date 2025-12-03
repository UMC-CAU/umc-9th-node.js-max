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
  updateUserInfo
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

import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { User } from "./generated/prisma/wasm.js";

dotenv.config();

passport.use("google", googleStrategy);
passport.use("jwt", jwtStrategy);

const upload = multer({ dest: "uploads/" }); //이미지 업로드를 위한 multer 설정

const app = express();
const port = process.env.PORT;

// 프록시 신뢰 설정 (Nginx 등 리버스 프록시 사용 시 필수)
app.set('trust proxy', 1);

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
app.use(passport.initialize()); //Passport 초기화

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

const isLogin = passport.authenticate('jwt', { session: false });

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.get('/mypage', isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user?.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

app.get("/oauth2/login/google", 
  passport.authenticate("google", { 
    session: false 
  })
);
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
	  session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user; 

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          message: "Google 로그인 성공!",
          tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      }
    });
  }
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./dist/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews); //특정 가게 리뷰 목록 엔드포인트

app.get("/api/v1/reviews/:userId", isLogin, handleListMyReviews); //내가 작성한 리뷰 목록 엔드포인트

app.get(
  "/api/v1/restaurant/:restaurantId/missions",
  handleListRestaurantMissions
); //특정 가게 미션 목록 엔드포인트

app.get("/api/v1/missions/:userId", isLogin, handleListMyMissions); //내가 진행 중인 미션 목록 엔드포인트

app.post("/api/v1/users/signup", handleUserSignUp); //회원가입 엔드포인트

app.post("/api/v1/restaurants/add", isLogin, handleRestaurantAdd); //음식점 추가 엔드포인트

app.post("/api/v1/:restaurantId/review", isLogin, upload.none(), handleReviewAdd); //리뷰 작성 엔드포인트

app.post("/api/v1/missions/:restaurantId/add", isLogin, handleMissionAdd); //미션 추가 엔드포인트

app.post("/api/v1/user-missions/:missionId/add", isLogin, handleUserMissionAdd); //유저미션 추가 엔드포인트
app.post("/api/v1/user-missions/complete", isLogin, handleUserMissionComplete); //미션 진행완료

app.patch("/api/v1/users/:userId", isLogin, updateUserInfo); //사용자 정보 수정 엔드포인트

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
