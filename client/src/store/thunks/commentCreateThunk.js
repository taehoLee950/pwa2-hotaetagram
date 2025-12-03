import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const storeCommentThunk = createAsyncThunk(
  "commentStore/storeCommentThunk", // Thunk 고유명 (Case 결과 고유명으로 지정된다)
  async (data, { rejectWithValue }) => {
    try {
      const url = `/api/comments`;

      const response = await axiosInstance.post(url, data);

      return response.data; // data = Api 요청의 반환 객체
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
