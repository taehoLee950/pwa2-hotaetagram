/**
 * @file app/controllers/files.controller.js
 * @description 파일 업로드 컨트롤러
 * 251127 v1.0.0 Lee init
 */

import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
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

async function storePost(req, res, next) {
  try {
    console.log(req.file, req.body);
    if (!req.file) {
      throw myError("파일 없음", BAD_FILE_ERROR);
    }
    // http://localhost:3000/files/posts/3tg4g-g34g34-g34g34-234f23.png
    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}/${req.file.filename}`,
    };
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (err) {
    next(err);
  }
}

async function storeProfile(req, res, next) {
  try {
    if (!req.file) {
      throw myError("파일 없음", BAD_FILE_ERROR);
    }
    // http://localhost:3000/files/posts/3tg4g-g34g34-g34g34-234f23.png
    const result = {
      path: `${process.env.APP_URL}${process.env.ACCESS_FILE_USER_PROFILE_IMAGE_PATH}/${req.file.filename}`,
    };
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (err) {
    next(err);
  }
}

// ----------------
// export
// ----------------
export default {
  storePost,
  storeProfile,
};

/**
 * 관습적 CRUE 메소드명
 * index: 데이터 조회 처리 (리스트 페이지 출력 || 리스트 데이터 획득)
 * show: 상세 데이터 조회 (상세 페이지 || 상제 데이터 획득)
 * create: 작성 페이지 출력
 * store: 새로운 데이터 작성 처리
 * edit: 수정 페이지 출력
 * update: 데이터 수정 처리
 * destroy: 데이터 삭제
 */
