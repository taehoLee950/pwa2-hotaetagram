import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (args, { rejectWithValue }) => {
    try {
      const url = "api/auth/login";
      const { email, password } = args;

      const response = await axiosInstance.post(url, { email, password });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// 토큰 재발급
export const reissueThunk = createAsyncThunk(
  "auth/reissueThunk",
  async (_, { rejectWithValue }) => {
    try {
      const url = "/api/auth/reissue";
      const response = await axiosInstance.post(url);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// 로그아웃
export const logoutThunk = createAsyncThunk(
  "auth/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      const url = "/api/auth/logout";
      const response = await axiosInstance.post(url);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// 회원가입

export const registerThunk = createAsyncThunk(

  "auth/registerThunk",

  async (args, { rejectWithValue }) => {

    try {

      const url = "api/auth/register";

      // passwordCheck는 UI에서만 사용하므로, thunk에 전달하지 않습니다.

      // UI 컴포넌트에서 nickname 필드를 받습니다.

      const { email, password, nickname } = args;



      const response = await axiosInstance.post(url, {

        email,

        password,

        nickname, // 'nick' -> 'nickname'

      });



      return response.data;

    } catch (error) {

      if (error.response) {

        return rejectWithValue(error.response.data);

      }

      return rejectWithValue(error.message);

    }

  }

);
