/**
 * @file app/services/auth.service.js
 * @description auth Service
 * 251120 Lee init
 */

import { NOT_REGISTERED_ERROR } from "../../configs/responseCode.config.js";
import myError from "../errors/customs/my.error.js";
import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwtUtil from "../utils/jwt/jwt.util.js";
import db from "../models/index.js";

// 인증 핵심 비즈니스 로직 처리 계층
async function login(body) {
  return await db.sequelize.transaction(async (t) => {
    const { email, password } = body;

    // email로 유저 정보 획득
    // db 통신을 repo에게 위임
    const user = await userRepository.findByEmail(null, email); // 이메일로 사용자 조회

    // 유저 존재 여부 체크
    if (!user) {
      throw myError("존재하지 않는 유저입니다.", NOT_REGISTERED_ERROR); // 조회 후 2차 검증
    }

    // 비밀번호 체크
    // 조회 후 2차 검증
    if (!bcrypt.compareSync(password, user.password)) {
      throw myError("비밀번호 틀림", NOT_REGISTERED_ERROR);
    }

    // JWT 생성 (accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(null, user);

    return { user, accessToken, refreshToken }; // 검증 전부 성공 시 사용자 정보 반환
  });
}

export default { login };
