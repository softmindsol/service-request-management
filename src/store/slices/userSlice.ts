// store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../features/user/user";

interface UserState {
  loading: boolean;
  error: string | null;
  currentUser: any; // can be refined
}

const initialState: UserState = {
  loading: false,
  error: null,
  currentUser: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
          builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
         builder.addCase(loginUser.fulfilled, (state, action) => {
           state.loading = false;
           state.currentUser = action.payload.user;
         });

          builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });

  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
