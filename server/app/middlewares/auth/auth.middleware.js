/**
 * @file server/app/middlewares/auth.middleware.js
 * @description 인증 및 인가 처리 미들웨어
 * 251126 v1.0.0 Lee init
 */

import { FORBIDDEN_ERROR } from "../../../configs/responseCode.config.js";
import myError from "../../errors/customs/my.error.js";
import jwtUtil from "../../utils/jwt/jwt.util.js";
import ROLE_PERMISSIONS from "./configs/role.permissions.js";

//  -----------------
//  Private
//  -----------------
function authenticate(req) {
  // 토큰 획득
  const token = jwtUtil.getBearerToken(req);

  // 토큰 검증 및 페이로드 획득
  const claims = jwtUtil.getClaimWithVerifyToken(token);

  // request 객체에 사용자 정보를 추가
  req.user = {
    id: parseInt(claims.sub),
    role: claims.role,
  };
}

//  -----------------
//  Private
//  -----------------
function authorize(req) {
  // 요청에 맞는 권한 규칙 조회
  const matchRole = ROLE_PERMISSIONS[req.method].find((item) => {
    return item.path.test(`${req.baseUrl}${req.path}`); // test(): 정규식의 method로 값이 정규식에 맞나 확인 (boolean)
  });
  // originalUrl: 유저가 보내온 전체 Path + Queries
  //  baseUrl: 프리픽스된 url
  //  path: 프리픽스 제외된 url
  console.log(req.originalUrl, req.baseUrl, req.path);
  // 일치하는 규칙이 있을 시, 인증 및 권한 체크를 실시
  if (matchRole) {
    // 인증 체크 및 인증 정보를 Request 셋
    authenticate(req);

    // 권한 체크
    const userRole = req.user?.role;
    if (!userRole || !matchRole.roles.includes(userRole)) {
      throw myError("권한 부족", FORBIDDEN_ERROR);
    }
  }
}

//  -----------------
//  Public
//  -----------------
export default function (req, res, next) {
  try {
    authorize(req);

    return next();
  } catch (error) {
    return next(error);
  }
}
