import { createSlice } from "@reduxjs/toolkit";
import { postIndexThunk } from "../thunks/postIndexThunk.js";

const initialState = {
  list: null,
  page: 0,
};

const slice = createSlice({
  name: "postIndex",
  initialState,
  reducers: {
    // state 초기화 리듀서
    clearPostIndex(state) {
      state.list = null;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postIndexThunk.fulfilled, (state, action) => {
      // api 반환값 상세 정보 구조 분해
      const { posts, page } = action.payload.data;
      // list state가 비어있는지 체크
      if (state.list) {
        state.list = [...state.list, ...posts];
      } else {
        state.list = posts;
      }

      // 현재 페이지 저장
      state.page = page;
    });
  },
});

export const { clearPostIndex } = slice.actions; // actions = reducers

export default slice.reducer;
