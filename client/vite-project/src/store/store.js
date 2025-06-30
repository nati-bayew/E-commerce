import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import adminOrdersSlice from "./admin/orders-slice";
import shopProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/addres-slice";
import shopOrderSlice from "./shop/order-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    productSlice: adminProductSlice,
    adminOrders: adminOrdersSlice,
    shoppingProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
