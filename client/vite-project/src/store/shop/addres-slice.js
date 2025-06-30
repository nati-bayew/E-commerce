import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadding: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/address/addAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response?.data;
  }
);

export const getAddress = createAsyncThunk(
  "/address/getAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response?.data;
  }
);

export const updateAddress = createAsyncThunk(
  "/address/updateAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response?.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response?.data;
  }
);

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoadding = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoadding = false;
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.addressList = action.payload.data);
      })
      .addCase(getAddress.rejected, (state) => {
        (state.isLoadding = false), (state.addressList = []);
      });
  },
});

export default addressSlice.reducer;
