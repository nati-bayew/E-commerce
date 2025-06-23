import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoadding: false,
  products: [],
};

export const getFilteredProducts = createAsyncThunk(
  "/products/featchAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );

    return response?.data;
  }
);
const shoppingFilteredProductSlice = createSlice({
  name: "shoppingProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.products = action.payload.data;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        (state.isLoadding = false), (state.products = []);
      });
  },
});

export default shoppingFilteredProductSlice.reducer;
