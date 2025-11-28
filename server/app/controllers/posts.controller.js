/**
 * @file app/controllers/posts.controller.js
 * @description 인증 관련 컨트롤러
 * 251128 v1.0.0 Lee init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// ----------------
// ---- public ----
// ----------------
/**
 * 게시글 이미지 업로드 컨트롤러 처리
 * @param {Request} req - HTTP 사용자 요청 {}
 * @param {Response} res - 사용자 요청에 반환할 로직 값 res.status(200).send(.....);
 * @param {import("express").NextFunction} next
 */
import postsService from "../services/posts.service.js";

async function index(req, res, next) {
  try {
    const page = req.body.page || 1; // page 없을 시 기본값 1

    const result = await postsService.pagination(page);
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

// ----------------
// ---- public ----
// ----------------
/**
 * 게시글 상세 조회 컨트롤러
 * @param {Request} req - HTTP 사용자 요청 {}
 * @param {Response} res - 사용자 요청에 반환할 로직 값 res.status(200).send(.....);
 * @param {import("express").NextFunction} next
 */
async function show(req, res, next) {
  try {
    const result = await postsService.show(req.params.id);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

export default {
  index,
  show,
};
