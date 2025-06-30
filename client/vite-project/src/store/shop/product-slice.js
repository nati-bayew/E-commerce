import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoadding: false,
  products: [],
  productDetail: null,
};

export const getProductDetail = createAsyncThunk(
  "/products/getProductDetail",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return response?.data;
  }
);

export const getFilteredProducts = createAsyncThunk(
  "/products/featchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    return response?.data;
  }
);
const shoppingFilteredProductSlice = createSlice({
  name: "shoppingProductSlice",
  initialState,
  reducers: {
    setProductDetail: (state) => {
      state.productDetail = null;
    },
  },
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
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.productDetail = action.payload.data;
      })
      .addCase(getProductDetail.rejected, (state) => {
        (state.isLoadding = false), (state.productDetail = null);
      });
  },
});

export const { setProductDetail } = shoppingFilteredProductSlice.actions;
export default shoppingFilteredProductSlice.reducer;
