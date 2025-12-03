import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postShowThunk = createAsyncThunk(
  "postShow/postShowThunk", // Thunk 고유명 (Case 결과 고유명으로 지정된다)
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/posts/${id}`;

      const response = await axiosInstance.get(url);

      return response.data; // data = Api 요청의 반환 객체
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
