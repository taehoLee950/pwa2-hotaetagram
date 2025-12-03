import { createSlice } from "@reduxjs/toolkit";
import { postShowThunk } from "../thunks/postShowThunk.js";

const initialState = {
  show: null,
};

const slice = createSlice({
  name: "postShow",
  initialState,
  reducers: {
    // state 초기화 리듀서
    clearPostShow(state) {
      state.show = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postShowThunk.fulfilled, (state, action) => {
      state.show = action.payload.data;
    });
  },
});

export const { clearPostShow } = slice.actions;

export default slice.reducer;
