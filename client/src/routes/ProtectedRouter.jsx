import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reissueThunk } from "../store/thunks/authThunk.js";
import { clearAuth } from "../store/slices/authSlice.js";

// 유저 권한
const ROLE = {
  ADMIN: "ADMIN",
  SUPER: "SUPER",
  NORMAL: "NORMAL",
};
const { ADMIN, SUPER, NORMAL } = ROLE;

// 인증 및 인가 필요한 라우트만 정의
const AUTH_REQURIED_ROUTES = [
  { path: /^\/users\/[0-9]+$/, roles: [NORMAL, SUPER] },
  { path: /^\/posts\/[0-9]+$/, roles: [NORMAL, SUPER] },
  { path: /^\/posts\/create$/, roles: [NORMAL, SUPER] },
];

// 비 로그인만 접근 허용하는 라우트 정의
const GUEST_ONLY_ROUTES = [/^\/login$/, /^\/registration$/];

// 유저 인증 및 인가 처리 담당
export default function ProtectedRouter() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // 게스트 라우트 확인
  const isGuestRoute = GUEST_ONLY_ROUTES.some((regx) =>
    regx.test(location.pathname)
  );

  // 액세스 토큰이 없을 경우, 토큰 재발급 시도 (브라우저의 새로고침 같은 메모리 초기화 대응)
  useEffect(() => {
    async function checkAuth() {
      if (!isLoggedIn) {
        try {
          await dispatch(reissueThunk()).unwrap();
        } catch (error) {
          console.log("protected router 에러 여기여기", error);
          dispatch(clearAuth());
        }
      }
      setIsAuthChecked(true);
    }

    checkAuth();
  }, []);

  // ProtectedRouter 재발급 처리 여부 체크
  if (!isAuthChecked) {
    return <></>; // useEffect 마운트 완료가 안 됐을시 중도 강제 return으로 아래 로직 실행을 막음
  }

  if (isGuestRoute) {
    if (isLoggedIn) {
      return <Navigate to="/posts" replace />; // 로그인된 사용자라면 /posts 페이지로 강제이동 및 replace로 history 삭제
    }
  } else {
    // 요청에 맞는 권한 규칙 조회
    const matchRole = AUTH_REQURIED_ROUTES.find((item) =>
      item.path.test(location.pathname)
    );

    // 일치하는 규칙 있을 시, 인증 및 권한 체크
    if (matchRole) {
      // 인증 체크
      if (isLoggedIn) {
        // 권한 체크
        if (matchRole.roles.includes(user.role)) {
          return <Outlet />;
        } else {
          alert("권한이 부족하여 사용할 수 없습니다.");
          return <Navigate to="/posts" replace />;
        }
      } else {
        alert("로그인이 필요한 서비스입니다.");
        return <Navigate to="/login" replace />;
      }
    }
  }

  return <Outlet />;
}
