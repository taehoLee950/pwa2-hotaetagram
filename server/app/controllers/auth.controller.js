/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러
 * 251119 v1.0.0 Lee init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import authService from "../services/auth.service.js";
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
  // logger.error("에러에러");
  // logger.warn("워닝워닝");
  // logger.info("인포인포");
  // logger.http("에이치티티피");
  // logger.verbose("장황장황 verbose!!");
  // logger.debug("디버그");
  // logger.silly("씰리씰리!");
  try {
    const body = req.body; // 유효성 검사 통과한 클라이언트 요청값 수집

    // 로그인 서비스 호출
    const { accessToken, refreshToken, user } = await authService.login(body);

    res
      .status(SUCCESS.status)
      .send(createBaseResponse(SUCCESS, { accessToken, user })); //응답 표준 호출
  } catch (e) {
    next(e); // 에러 발생시 errorHandler.js에서 처리하도록 넘김
  }
}

// ----------------
// export
// ----------------
export const authController = {
  login,
};
