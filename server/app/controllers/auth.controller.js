/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 Lee init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ----------------
// ---- public ----
// ----------------
/**
 * 로그인 컨트롤러 처리
 * @param {Request} req - HTTP 사용자 요청 {}
 * @param {Response} res - 사용자 요청에 반환할 로직 값 res.status(200).send(.....);
 * @param {import("express").NextFunction} next
 */
async function login(req, res, next) {
  const body = req.body;
  res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, body));
}

// ----------------
// export
// ----------------
export const authController = {
  login,
};
