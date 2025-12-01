import axios from "axios";

// axios instance
const axiosInstance = axios.create({
  baseURL: "", // 기본 URL (공통 도메인)
  headers: {
    "Content-Type": "application/json", // 요청 규칙: json
  },
  // 크로스 도메인 요청 시 민감 정보 포함 여부 지정
  withCredentials: true, // cookie, 헤더의 authorization, etc..
});

export default axiosInstance;
