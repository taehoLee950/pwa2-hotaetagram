/**
 * @file configs/env.config.js
 * @description 환경에 따른 env 설정 자동 적용
 * 251117 v1.0.0 Lee 최초 생성 (package.json 버전과 동일하게 작성)
 */

import fs from "fs";
import dotenv from "dotenv";

const envFiles = [".env.production", ".env.test", ".env"];

// envFiles 루프: 해당 파일이 있으면 파일경로 저장
// 예1) .env.test와 .env가 있을 경우 최종적으로 .env를 셋팅
// 예2) .env.test만 .env 있을 경우 최종적으로 .env.test를 셋팅
// 예3) .env.production, .env.test, .env가 있을 경우 최종적으로 .env를 셋팅
let filePath = "";
for (const file of envFiles) {
  if (fs.existsSync(file)) {
    filePath = file;
  }
}

// 세팅된 filePathㄹ dotenv 설정
dotenv.config({
  path: filePath,
  debug: filePath === ".env" ? true : false,
});
console.log(`Loaded env: ${filePath}`);
