/**
 * @file routes/posts.router.js
 * @description 구독 관련 라우터
 * 251208 v1.0.0 Lee init
 */

import express from "express";
import authMiddleware from "../app/middlewares/auth/auth.middleware.js";
import subscriptionsController from "../app/controllers/subscriptions.controller.js";

const subscriptionsRouter = express.Router();

subscriptionsRouter.post(
  "/",
  authMiddleware,
  subscriptionsController.subscribe
);

export default subscriptionsRouter;
