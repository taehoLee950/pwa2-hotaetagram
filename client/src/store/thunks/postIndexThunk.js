import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postIndexThunk = createAsyncThunk(
  "postIndex/postIndexThunk", // Thunk 고유명 (Case 결과 고유명으로 지정된다)
  async (page, { rejectWithValue }) => {
    try {
      const url = "/api/posts";
      const params = {
        page,
      };

      const response = await axiosInstance.get(url, { params });

      return response.data; // data = Api 요청의 반환 객체
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
