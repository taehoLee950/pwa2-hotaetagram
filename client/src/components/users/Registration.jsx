import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../store/thunks/authThunk.js";
import { clearRegisterSuccess, clearError } from "../../store/slices/authSlice.js";
import "./Registration.css";

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isRegisterSuccess } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState(""); // 필드명 nickname으로 통일
  const [clientError, setClientError] = useState(""); // 클라이언트 측 유효성 검사용 에러

  useEffect(() => {
    // 회원가입 성공 시 처리
    if (isRegisterSuccess) {
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      dispatch(clearRegisterSuccess()); // 성공 상태 초기화
      navigate("/login"); // 로그인 페이지로 리다이렉트
    }

    // 서버 에러 메시지 처리
    if (error) {
      alert(`회원가입 실패: ${error.message || error}`); // 에러 메시지 표시
      dispatch(clearError()); // 에러 상태 초기화
    }

    // 컴포넌트 언마운트 시 클린업
    return () => {
      dispatch(clearRegisterSuccess());
      dispatch(clearError());
    };
  }, [isRegisterSuccess, error, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError(""); // 이전 클라이언트 에러 초기화

    // 클라이언트 측 유효성 검사
    if (!email || !password || !passwordCheck || !nickname) {
      setClientError("모든 필수 항목을 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      setClientError("비밀번호가 일치하지 않습니다.");
      return;
    }
    // TODO: 이메일, 비밀번호, 닉네임 형식에 대한 클라이언트 측 유효성 검사 추가 (백엔드와 동일하게)

    dispatch(registerThunk({ email, password, nickname }));
  };

  return (
    // className을 div에서 form으로 이동
    <form className="registration-container" onSubmit={handleSubmit}>
      {clientError && <p className="error-message">{clientError}</p>}
      
        <input
          type="email" // type을 email로 변경
          className="input-big-border"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password" // type을 password로 변경
          className="input-big-border"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password" // type을 password로 변경
          className="input-big-border"
          name="passwordCheck" // id와 name을 passwordCheck로 변경
          id="passwordCheck"
          placeholder="password check"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          className="input-big-border"
          name="nickname" // name을 nickname으로 변경
          id="nickname" // id를 nickname으로 변경
          placeholder="nickname" // placeholder를 nickname으로 변경
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isLoading}
        />
        {/* 프로필 이미지 입력은 현재 백엔드 로직에 포함되지 않아 주석 처리 */}
        {/* <input type="file" name="profile" id="profile" accept="image/*" />
        <div
          className="profile profile-medium"
          style={{ backgroundImage: `url("/dev/kanna.jpg")` }}
        ></div> */}
        <button type="submit" className="btn-big bg-gray" disabled={isLoading}>
          {isLoading ? "회원가입 중..." : "Sign up"}
        </button>
      </form>
  );
}
