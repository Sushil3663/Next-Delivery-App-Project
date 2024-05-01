import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { FoodItem } from "../_components/common";
import toast from "react-hot-toast";

// Define the initial state using that type
const initialCartData = localStorage.getItem("cartData");
let initialState = {
  cartItem: initialCartData ? JSON.parse(initialCartData) : [],
};
export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addSlice: (state, action) => {
      const check = state.cartItem.some(
        (el: FoodItem) => el._id === action.payload._id
      );
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qtn: 1, total: total },
        ];
        localStorage.setItem(
          "cartData",
          JSON.stringify([
            ...state.cartItem,
            { ...action.payload, qtn: 1, total: total },
          ])
        );
      }
    },
  },
});

export const { addSlice } = cartSlice.actions;

export const selectUser = (state: RootState) => state.carts;

export default cartSlice.reducer;
