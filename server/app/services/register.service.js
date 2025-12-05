/**
 * @file app/services/register.service.js
 * @description posts Service
 * 251205 Lee init
 */

import myError from "../errors/customs/my.error.js";
import postRepository from "../repositories/post.repository.js";
import db from "../models/index.js";
import commentRepository from "../repositories/comment.repository.js";
import likeRepository from "../repositories/like.repository.js";
import { UNMATCHING_USER_ERROR } from "../../configs/responseCode.config.js";

/**
 * 회원가입
 */
async function register({ userId, postId }) {
  // 트랜잭션 시작
  return await db.sequelize.transaction(async (t) => {});
}

export default {};
