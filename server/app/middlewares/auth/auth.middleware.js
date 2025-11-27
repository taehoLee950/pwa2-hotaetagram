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
  const token = jwtUtil.getBearerToken(req); // JWT 토큰 추출

  // 토큰 검증 및 페이로드 획득
  const claims = jwtUtil.getClaimWithVerifyToken(token); // 토큰 유효 || 만료 확인

  // 위 절차 성공 시 request 객체에 사용자 정보를 추가
  req.user = {
    id: parseInt(claims.sub), // 사용자 id 저장
    role: claims.role, // 사용자 역할 저장
  };
}

//  -----------------
//  Private
//  -----------------
function authorize(req) {
  // 사용자 역할 조회
  // req.method: request의 HTTP method (GET, POST...)등을 조회
  const matchRole = ROLE_PERMISSIONS[req.method].find((item) => {
    return item.path.test(`${req.baseUrl}${req.path}`); // path: 권한 규칙,
    // test(): 정규 표현식 객체의 메써드, 정규 표현식에 매치되는지 확인 후 boolean 반환
  });

  // 일치하는 규칙이 있을 시, 인증 및 권한 체크를 실시
  if (matchRole) {
    authenticate(req); // 요청 헤더에서 JWT 토큰 유효성 검증 후 req.user의 id & role 재정의

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
