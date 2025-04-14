// src/features/user/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@/api/api';

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
