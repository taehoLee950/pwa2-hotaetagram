import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, reissueThunk } from "../thunks/authThunk.js";

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload.data;
        state.accessToken = accessToken;
        state.user = user;
        state.isLoggedIn = true;
      }) // reissue용
      .addCase(reissueThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload.data;
        state.accessToken = accessToken;
        state.user = user;
        state.isLoggedIn = true;
      });
  },
});

export const {} = slice.actions;

export default slice.reducer;
