/**
 * @file server/app/middlewares/validations/fields/post.field.js
 * @description 포스트 필드 유효성 검사 필드
 * 251128 v1.0.0 Lee init
 */

import { body, param } from "express-validator";

// 페이지 필드
export const page = body("page")
  .trim()
  .optional()
  .isNumeric()
  .withMessage("숫자만 허용")
  .toInt();

// 게시글 PK 빌드
export const id = param("id") // segment param에서 id 빼오기, query라면 param.query
  .trim()
  .notEmpty()
  .withMessage("필수 항목입니다.")
  .bail()
  .isNumeric()
  .withMessage("숫자만 허용합니다.")
  .toInt();
