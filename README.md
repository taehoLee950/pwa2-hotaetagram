# client (front side libraries)

npm create vite@latest .
npm i dayjs react-router-dom @reduxjs/toolkit react-redux axios jwt-decode
npm install -D vite-plugin-pwa

# server (back side libraries)

npm init
npm i express express-validator morgan winston dotenv sequelize sequelize-cli mysql2 cookie-parser jsonwebtoken cors multer swagger-ui-express yaml dayjs bcrypt web-push
npm install -D nodemon

# \* 관습적 CRUE 메소드명

```
index: 데이터 조회 처리 (리스트 페이지 출력 || 리스트 데이터 획득)
show: 상세 데이터 조회 (상세 페이지 || 상제 데이터 획득)
create: 작성 페이지 출력
store: 새로운 데이터 작성 처리
edit: 수정 페이지 출력
update: 데이터 수정 처리
destroy: 데이터 삭제
```

hotaetagram/
├── client/ # Vite + React (PWA)
│ ├── src/ # React 실행 관련 로직
│ │ ├── assets/ # 비공개 정적 파일
│ │ ├── config/ # 설정 파일 (환경 변수, API 엔드포인트, Firebase/Web Push 설정 등)
│ │ ├── components/ # 컴포넌트
│ │ ├── routes/ # React 라우터
│ │ ├── store/ # 리덕스 관련
│ │ │ ├── slices/ # 리덕스 슬라이스 관련
│ │ │ └── store.js
│ │ ├── utils/ # 유틸
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── sw.js # service-worker 파일
│ ├── index.html
│ └── vite.config.js
│
├── server/ # Express
│ ├── app/ # Express 실행 관련 로직
│ │ ├── controllers/ # 컨트롤러 레이어 (유효성 검사, Request/Response 데이터 가공, 비즈니스 로직 연결)
│ │ ├── middlewares/ # 미들웨어 (JWT 인증, 권한 체크, 에러 핸들링, 로깅 등)
│ │ ├── models/ # 모델 (Sequelize 등)
│ │ ├── repositories/ # DB 접근 레이어
│ │ ├── services/ # 비즈니스 로직 레이어
│ │ └── utils/ # 유틸
│ ├── configs/ # 전역 설정 파일 (DB, JWT, OAuth, Push 등)
│ ├── database/ # 데이터베이스 관련
│ │ ├── migrations/ # 마이그레이션 (DB 스키마 작성 파일)
│ │ └── seeders/ # 시더 (DB 더미 데이터 생성 파일)
│ ├── routes/ # API 엔드포인트 정의
│ ├── storage/ # 정적 파일 서빙 디렉토리 (업로드 파일, PWA build 결과물), 운영환경 경로 주의
│ ├── app.js # API 엔트리 포인트
│ └── .env # 환경 변수 설정 파일
└── README.md
