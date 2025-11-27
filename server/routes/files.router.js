/**
 * @file routes/files.router.js
 * @description 파일 업로드 관련 라우터
 * 251119 v1.0.0 Lee init
 */

import express from "express";
import multerMiddleware from "../app/middlewares/multer/multer.middleware.js";
import filesController from "../app/controllers/files.controller.js";
import authMiddleware from "../app/middlewares/auth/auth.middleware.js";

const filesRouter = express.Router();

filesRouter.post(
  "/posts",
  authMiddleware, // 사용자 인증 & 인가
  multerMiddleware.postUploader,
  filesController.storePost
);
filesRouter.post(
  "/profiles",
  authMiddleware, // 사용자 인증 & 인가
  multerMiddleware.profileUploader,
  filesController.storeProfile
);
export default filesRouter;
