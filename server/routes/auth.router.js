/**
 * @file routes/auth.router.js
 * @description 토큰 재발급 라우터
 * 251119 v1.0.0 Lee init
 */

import express from "express";
import authController from "../app/controllers/auth.controller.js";
import loginValidator from "../app/middlewares/validations/validators/auth/login.validator.js";
import validationHandler from "../app/middlewares/validations/validationHandler.js";
import socialValidator from '../app/middlewares/validations/validators/auth/social.validator.js'

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidator,
  validationHandler,
  authController.login
);

authRouter.post("/reissue", authController.reissue);

authRouter.get('/social/:provider', socialValidator, validationHandler, authController.social);

authRouter.get('/callback/:provider', authController.socialCallback);
export default authRouter;
