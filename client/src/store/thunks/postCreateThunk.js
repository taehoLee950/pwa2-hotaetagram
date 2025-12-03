import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postImageUploadThunk = createAsyncThunk(
  "postCreate/postImageUploadThunk", // Thunk 고유명 (Case 결과 고유명으로 지정된다)
  async (file, { rejectWithValue }) => {
    try {
      const url = `/api/files/posts`;
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      // 폼데이터 생성: 파일 -> formdata 형식으로 전환
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosInstance.post(url, formData, { headers });

      return response.data; // data = Api 요청의 반환 객체
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const postStoreThunk = createAsyncThunk(
  "postCreate/postStoreThunk", // Thunk 고유명 (Case 결과 고유명으로 지정된다)
  async (data, { rejectWithValue }) => {
    try {
      const url = `/api/posts`;

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
