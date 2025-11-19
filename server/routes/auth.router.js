/**
 * @file routes/auth.router.js
 * @description validator router
 * 251119 v1.0.0 Lee init
 */

import express from "express";
import { authController } from "../app/controllers/auth.controller.js";
import loginValidator from "../app/middlewares/validations/validators/auth/login.validator.js";
import validationHandler from "../app/middlewares/validations/validators/validationHandler.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  loginValidator,
  validationHandler,
  authController.login
);

export default authRouter;
