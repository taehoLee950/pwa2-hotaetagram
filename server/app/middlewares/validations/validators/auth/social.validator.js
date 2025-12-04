/**
 * @file app/middlewares/validations/validators/auth/social.validator.js
 * @description 로그인 유효성 체크
 * 251204 v1.0.0 Lee init
 */

import userField from "../../fields/user.field.js";

export default [userField.provider];
