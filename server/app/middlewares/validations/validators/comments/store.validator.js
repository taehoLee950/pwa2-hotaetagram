/**
 * @file app/middlewares/validations/validators/comments/store.validator.js
 * @description 유저 정보 유효성 검사 필드
 * 251203 v1.0.0 Lee init
 */

import { postId, replyId, content } from "../../fields/comment.field.js";

export default [postId, replyId, content];
