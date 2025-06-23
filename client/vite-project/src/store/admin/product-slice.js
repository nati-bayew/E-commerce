import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoadding: false,
  products: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData
    );
    return response?.data;
  }
);
export const getProducts = createAsyncThunk(
  "/products/featchAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return response?.data;
  }
);
export const updateProduct = createAsyncThunk(
  "/products/updateProduct",
  async ({ formData, id }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/products/update/${id}`,
      formData
    );
    return response?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        (state.isLoadding = false), (state.products = action?.payload?.data);
      })
      .addCase(getProducts.rejected, (state) => {
        (state.isLoadding = false), (state.products = []);
      });
  },
});

export default productSlice.reducer;
