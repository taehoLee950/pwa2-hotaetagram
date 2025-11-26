/**
 * @file routes/auth.router.js
 * @description validator router
 * 251119 v1.0.0 Lee init
 */

import express from "express";
import { authController } from "../app/controllers/auth.controller.js";
import loginValidator from "../app/middlewares/validations/validators/auth/login.validator.js";
import validationHandler from "../app/middlewares/validations/validators/validationHandler.js";
import authMiddleware from "../app/middlewares/auth/auth.middleware.js";

// 인증 관련 라우트
const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidator, // 클라이언트 입력값 유효성 검사
  validationHandler, // 검사 결과 공통 처리
  authController.login // 비즈니스 로직 전달
);

authRouter.post("/reissue", authMiddleware, (req, res, next) => {
  return res.send("reissue test");
});
export default authRouter;
