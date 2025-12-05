/**
 * @file app/controllers/register.controller.js
 * @description 인증 관련 컨트롤러
 * 251205 v1.0.0 Lee init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

async function register(req, res, next) {
  try {
    // 회원 가입 서비스 호출
    // TODO: registerService 생성 후 적용
    // TODO: registerService.register 함수 반환값 분해할당

    const body = req.body; // parameter 획득

    const {} = await registerService.register(body);

    // TODO: 회원가입 완료시 메시지 출력?
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {}));
  } catch (error) {}
}

export default {};
