import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadding: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
  "/orders/admminGetOrders",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/orders/get"
    );
    return response?.data;
  }
);

export const getOrdersDetails = createAsyncThunk(
  "/orders/getOrdersDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response?.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      { orderStatus }
    );
    return response?.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetailForAdmin: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.orderList = action.payload.data);
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoadding = false;
        state.orderList = [];
      })
      .addCase(getOrdersDetails.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getOrdersDetails.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.orderDetails = action.payload.data);
      })
      .addCase(getOrdersDetails.rejected, (state) => {
        state.isLoadding = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetailForAdmin } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
