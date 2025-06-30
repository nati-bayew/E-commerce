import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoadding: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/cart/get/${userId}`
  );

  return response.data;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update",
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );

    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        (state.isLoadding = false), (state.cartItems = []);
      })
      .addCase(getCart.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCart.rejected, (state) => {
        (state.isLoadding = false), (state.cartItems = []);
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCart.rejected, (state) => {
        (state.isLoadding = false), (state.cartItems = []);
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCart.rejected, (state) => {
        (state.isLoadding = false), (state.cartItems = []);
      });
  },
});

export default cartSlice.reducer;
