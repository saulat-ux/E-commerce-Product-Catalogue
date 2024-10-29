import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import prodReducer from "../redux/features/prod/productSlice"
import cartReducer from "../redux/features/cart/cartSlice"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        prod: prodReducer,
        cart: cartReducer,
    }
})