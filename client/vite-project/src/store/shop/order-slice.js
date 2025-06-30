import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoadding: false,
  orderList: [],
  orderDetail: null,
};

export const addOrders = createAsyncThunk(
  "/orders/addOrders",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/orders/add",
      orderData
    );
    return response?.data;
  }
);

export const getOrersByUserId = createAsyncThunk(
  "/orders/getOrders",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/orders/get/${userId}`
    );
    return response?.data;
  }
);

export const getOrdersDetail = createAsyncThunk(
  "/orders/getOrdersDetail",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/orders/get-detail/${id}`
    );
    return response?.data;
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    resetOrderDetail: (state) => {
      state.orderDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrders.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(addOrders.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.orderList = action?.payload.data);
      })
      .addCase(addOrders.rejected, (state) => {
        (state.isLoadding = false), (state.orderList = []);
      })
      .addCase(getOrersByUserId.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getOrersByUserId.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.orderList = action.payload.data);
      })
      .addCase(getOrersByUserId.rejected, (state) => {
        state.isLoadding = false;
      })
      .addCase(getOrdersDetail.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getOrdersDetail.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.orderDetail = action.payload.data);
      })
      .addCase(getOrdersDetail.rejected, (state) => {
        state.isLoadding = false;
        state.orderDetail = null;
      });
  },
});

export const { resetOrderDetail } = orderSlice.actions;

export default orderSlice.reducer;
