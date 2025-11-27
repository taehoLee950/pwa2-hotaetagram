/**
 * @file server/app/middlewares/multer/uploaders/profile.uploader.js
 * @description 프로필 이미지 업로더
 * 251127 v1.0.0 Lee init
 */

import multer from "multer";
import myError from "../../../errors/customs/my.error.js";
import { BAD_FILE_ERROR } from "../../../../configs/responseCode.config.js";
import fs from "fs"; //file system
import dayjs from "dayjs";

/**
 * 프로필 이미지 업로더 처리 미들웨어
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function (req, res, next) {
  // multer 객체 인스턴스
  const upload = multer({
    // 파일 저장 위치 제어 프로퍼티
    storage: multer.diskStorage({
      //파일 저장 경로 설정
      destination: (req, file, cb) => {
        // 저장 디렉토리 설정
        if (!fs.existsSync(process.env.FILE_USER_PROFILE_PATH)) {
          // 해당 디렉토리 없으면 생성 처리
          fs.mkdirSync(process.env.FILE_USER_PROFILE_PATH, {
            recursive: true, // 중간 디렉토리까지 모두 생성
            mode: 0o755, // 권한 설정 rwxr-xr-x
          });
        }
        cb(null, process.env.FILE_USER_PROFILE_PATH); // multer 기본 내부 탑재 콜백함수, 에러가 날시 첫 인자에 null -> error로 들어온다
      },
      // 파일명 설정
      filename(req, file, cb) {
        // 저장할 파일명 생성 *파일명 중복 안되게 crypto.randomUUID() 실행
        const uniqueFileName = `${dayjs().format(
          "YYYYMMDD"
        )}_${crypto.randomUUID()}`;
        const fileNameParts = file.originalname.split("."); //originalname에는 유저가 전달한 확장자 포함 풀 네임을 들고온다.
        const ext = fileNameParts[fileNameParts.length - 1].toLowerCase(); // . 구분된 요소의 마지막 요소 (확장자) + 소문자

        cb(null, `${uniqueFileName}.${ext}`);
      },
    }),
    // 파일 필터링 제어 프로퍼티 (jpg.. 등의 확장자)
    fileFilter(req, file, cb) {
      if (!file.mimetype.startsWith("image/")) {
        return cb(myError("이미지 파일 아님", BAD_FILE_ERROR));
      }
      cb(null, true);
    },
    // 파일 사이즈 || 갯수 제한 등..
    limits: {
      fileSize: parseInt(process.env.FILE_profile_IMAGE_SIZE),
    },
  }).single("image"); // image라는 이름을 multer가 받아 각 프로퍼티를 실행

  //   예외 처리
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      next(myError(err.message, BAD_FILE_ERROR));
    }
    next();
  });
}
