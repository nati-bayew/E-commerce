import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoadding: true,
  user: null,
};
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
});
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/auth-check",

    {
      withCredentials: true,
    }
  );

  return response.data;
});
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = action.payload.success ? true : false),
          (state.user = action.payload.success ? action.payload.user : null);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = action.payload.success ? true : false),
          (state.user = action.payload.success ? action.payload.user : null);
      })
      .addCase(checkAuth.rejected, (state, action) => {
        (state.isLoadding = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.isLoadding = false),
          (state.isAuthenticated = false),
          (state.user = null);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
