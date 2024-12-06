import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import authSlice from "./features/cart/authSlice";
import productSlice from "./features/cart/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice, 
    product: productSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
