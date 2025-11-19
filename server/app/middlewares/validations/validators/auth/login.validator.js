/**
 * @file app/middlewares/validations/validators/auth/login.validator.js
 * @description 로그인 유효성 체크
 * 251119 v1.0.0 Lee init
 */

import userField from "../../fields/user.field.js";

export default [userField.email, userField.password];

// 또는 아래 형식으로 가능, 출처를 명확히 해주기 위해선 객체로 여러값을 내보내며 {}.method로 적용
// import { email, password } from "../../fields/user.field.js";
// export default [email, password];
