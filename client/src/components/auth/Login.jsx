import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/thunks/authThunk.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    // 기본(기존)이벤트 막기
    e.preventDefault();
    // 로그인 요청
    try {
      await dispatch(loginThunk({ email, password })).unwrap();

      return navigate("/posts", { replace: true }); // replace: true : history 관련
    } catch (error) {
      console.log(error, "에러에러 여기봐");
      const code = error.response?.data?.code;
      alert(`로그인 실패했습니다. ${code}`);
    }
  }

  function handleSocial(provider) {
    // vanila JS로 작성
    window.location.replace(`/api/auth/social/${provider}`);
  }

  function redirectRegistration() {
    return navigate("/registration");
  }

  // /**
  //  * 이메일 형식 validation 예시
  //  */
  // const [emailErr, setEmailErr] = useState("");
  // function validationAndSetEmail(e) {
  //   const val = e.target.value;

  //   if (/^[0-9]+$/.test(val)) {
  //     setEmail(e.target.value);
  //     setEmailErr(null); // 통과 후 이메일 초기화
  //   } else {
  //     setEmailErr("이메일 형식 오류");
  //   }
  // }
  return (
    <>
      {email} {password}
      <form className="login-container" onSubmit={handleLogin}>
        <input
          type="text"
          className="input-big-border"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          id="email"
          placeholder="email"
        />
        <input
          type="text"
          className="input-big-border"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit" className="btn-big bg-gray" onClick={handleLogin}>
          Log in
        </button>
        <div className="text-on-line">or</div>
        <button
          type="button"
          className="btn-big bg-img-kakao"
          onClick={() => {
            handleSocial("kakao");
          }}
        ></button>
        <button
          type="button"
          className="btn-big bg-light"
          onClick={redirectRegistration}
        >
          Sign up
        </button>
      </form>
    </>
  );
}
