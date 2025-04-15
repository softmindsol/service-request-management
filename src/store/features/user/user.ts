// src/features/user/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@/api/api';
interface LoginData {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "user/register",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user", formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", data, {
        withCredentials: true,
      });

      return response.data; // returns user + token or whatever your API sends
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
