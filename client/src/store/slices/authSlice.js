import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  registerThunk,
  reissueThunk,
} from "../thunks/authThunk.js"; // logoutThunk import 추가

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
  isLoading: false, // 로딩 상태 추가
  error: null, // 에러 메시지 추가
  isRegisterSuccess: false, // 회원가입 성공 여부 추가
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // state 초기화 리듀서
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      state.isRegisterSuccess = false; // 추가
    },
    // 회원가입 성공 상태 초기화 리듀서 (회원가입 성공 후 메시지를 한 번 보여준 뒤 초기화하기 위함)
    clearRegisterSuccess(state) {
      state.isRegisterSuccess = false;
    },
    // 에러 상태 초기화 리듀서
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "로그인 실패";
      })

      // Reissue Thunk
      .addCase(reissueThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reissueThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data.user;
      })
      .addCase(reissueThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "토큰 재발급 실패";
      })

      // Logout Thunk
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
        state.accessToken = null;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "로그아웃 실패";
      })

      // Register Thunk
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isRegisterSuccess = false; // 회원가입 성공 여부 초기화
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isRegisterSuccess = true; // 회원가입 성공 표시
        // 회원가입 후 바로 로그인시키지 않으므로 user나 isLoggedIn은 변경하지 않음
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isRegisterSuccess = false;
        state.error = action.payload || "회원가입 실패";
      });
  },
});

export const { clearAuth, clearRegisterSuccess, clearError } = slice.actions; // 액션 추가

export default slice.reducer;
