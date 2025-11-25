/**
 * @file /app/utils/jwt/jwt.util.js
 * @description jwt utility
 * 251125 v1.0.0 Lee init
 */

import jwt from "jsonwebtoken";

// -----------------
// private
// -----------------
/**
 * JWT 생성
 * @param {{}} payload
 * @param {number} ttl
 * @returns {string} JWT
 */
function generateToken(payload, ttl) {
  // 옵션 설정
  const options = {
    algorithm: process.env.JWT_ALGORITHM,
    noTimestamp: false, // payload.iat 설정 (토큰 발급 시간 관련 설정)
    expiresIn: ttl, // payload.exp 설정 (토큰 만료 시간) 초단위
    issuer: process.env.JWT_ISSUER, // payload.iss 설정 (토큰 발급자)
  };

  // 토큰 생성
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// -----------------
// public
// -----------------

/**
 * 액세스 토큰 생성
 * @param {import("../../models/index.js").User} user
 * @returns {string} JWT
 */
function generateAccessToken(user) {
  // payload 설정        /user agrument: 유저 테이블
  const payload = {
    sub: user.id, // payload.sub set (value: user pk)
    role: user.role, // payload.role set (value: user role)
  };

  // 액세스 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY));
}

/**
 * 리프레시 토큰 생성
 * @param {import("../../models/index.js").User} user
 * @returns {string} JWT
 */
function generateRefreshToken(user) {
  // payload 설정        /user agrument: 유저 테이블
  const payload = {
    sub: user.id, // payload.sub set (value: user pk)
  };

  // 리프레시 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY));
}

// 내보내기
// generateToken: private이라 export 하지 않음.
export default {
  generateAccessToken,
  generateRefreshToken,
};
