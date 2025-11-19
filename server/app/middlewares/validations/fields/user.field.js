/**
 * app/middlewares/validations/fields/user.field.js
 * @description 유저 정보 유효성 검사 필드
 * 251119 v1.0.0 Lee init
 */
import { body } from "express-validator";

const email = body("email")
  .trim()
  .notEmpty()
  .withMessage("이메일은 필수 항목입니다.")
  .bail()
  .isEmail()
  .withMessage("유효한 이메일을 입력해주세요.");

const password = body("password")
  .trim()
  .notEmpty()
  .withMessage("비밀번호는 필수 항목입니다.")
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식
  .withMessage("영어 대/소문자, 숫자, !@#$, 8~20자 허용");

export default {
  email,
  password,
};
