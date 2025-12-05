/**
 * @file app/middlewares/validations/fields/user.register.field.js
 * @description 회원가입 유효성 검사 필드
 * 251205 v1.0.0 Lee init
 */

import { body } from "express-validator";
import pathUtil from "../../../utils/path/path.util.js";

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
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/)
  .withMessage("영어대소문자·숫자·!·@·#·$, 8~20자 허용");

const passwordCheck = body("passwordCheck")
  .trim()
  // param 이름 고정
  .custom((val, { req }) => {
    if (val !== req.body.password) {
      return false;
    }
    return true;
  })
  .withMessage("비밀번호 잘 좀 쳐보세요 ㅋ");

const nick = body("nick")
  .trim() // Remove leading/trailing whitespace
  .notEmpty()
  .withMessage("닉네임은 필수 입니다.") // Ensure it's not empty
  .isLength({ min: 2, max: 12 })
  .withMessage("닉네임 길이 2 ~ 12 이내") // Set length constraints
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("닉네임 포함: 문자, 숫자, underscores만 가능합니다"); // Allow specific characters

// const profile = body('profile')
//   .bail()
//   .custom(val => {
//     const splitPath = val.split('/');
//     const fullPath = pathUtil.join(pathUtil.getProfilesImagePath(), splitPath[splitPath.length -1]);

//     if(!fs.exist)
//   })
export default {
  email,
  password,
  passwordCheck,
  nick,
};
