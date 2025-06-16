import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoadding: false,
  user: null,
};
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Added Content-Type header
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = false),
          (state.user = null);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
