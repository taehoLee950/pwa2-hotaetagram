/**
 * @file configs/responseCode.config.js
 * @description 서비스 전역 응답 코드 설정 모듈, 각 API 응답 시 참조되는 표준 응답 코드 정의
 * 251119 v1.0.0 Lee init
 */

// ---------------------
// Type import
// ---------------------
/**
 * @typedef {import('./responseCode.config.type.js').ResponseCodeConfig} ResponseCodeConfig
 */

/**
 * 정상 처리 응답 코드
 * @type {ResponseCodeConfig}
 */

const SUCCESS = {
  code: "00",
  msg: "NORMAL_CODE",
  info: "정상 처리",
  status: 200,
};
Object.freeze(SUCCESS); // 외부에서 객체 수정이 불가능하게 상수 객체 설정

/**
 * 로그인 에러 응답 코드
 * @type {ResponseCodeConfig}
 */
const NOT_REGISTERED_ERROR = {
  code: "E01",
  msg: "Unauthorized Error",
  info: "아이디나 비밀번호가 틀렸습니다.",
  status: 400,
};
Object.freeze(NOT_REGISTERED_ERROR); // 외부에서 객체 수정이 불가능하게 상수 객체 설정

/**
 * 파라미터 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_REQUEST_ERROR = {
  code: "E01",
  msg: "Bad Request Error",
  info: "요청 파라미터에 이상이 있습니다.",
  status: 400,
};
Object.freeze(NOT_REGISTERED_ERROR); // 외부에서 객체 수정이 불가능하게 상수 객체 설정

/**
 * DB 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const DB_ERROR = {
  code: "E80",
  msg: "DB Error",
  info: "서비스 제공 상태가 이상합니다.",
  status: 500,
};
Object.freeze(DB_ERROR);

/**
 * 시스템 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SYSTEM_ERROR = {
  code: "E99",
  msg: "Application Error",
  info: "서비스 제공 상태가 이상합니다.",
  status: 500,
};
Object.freeze(SYSTEM_ERROR);
export {
  SUCCESS,
  NOT_REGISTERED_ERROR,
  BAD_REQUEST_ERROR,
  SYSTEM_ERROR,
  DB_ERROR,
};
