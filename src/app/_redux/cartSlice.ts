import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { CartItem, FoodItem } from "../_components/common";
import toast from "react-hot-toast";

// Define the initial state using that type
const initialCartData = localStorage?.getItem("cartData");
let initialState = {
  cartItem: initialCartData ? JSON.parse(initialCartData) : [],
};

// const initialCartData =
//   typeof window !== "undefined" ? localStorage.getItem("cartData") : null;
// let initialState = {
//   cartItem: initialCartData ? JSON.parse(initialCartData) : [],
// };
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
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qtn: 1, total: total },
        ];
        toast("Item Add successfully");
        localStorage.setItem("cartData", JSON.stringify(state.cartItem));
      }
    },
    deleteItem: (state, action) => {
      console.log(action.payload);
      const idToRemove = action.payload;
      state.cartItem = state.cartItem.filter(
        (item: CartItem) => item._id !== idToRemove
      );
      localStorage.setItem("cartData", JSON.stringify(state.cartItem));
    },
    increaseQtn: (state, action) => {
      const index = state.cartItem.findIndex(
        (el: CartItem) => el._id === action.payload
      );
      let qtn = state.cartItem[index].qtn;
      console.log(qtn);
      let qtnInc = qtn + 1;
      console.log(qtnInc);

      state.cartItem[index].qtn = qtnInc;

      const price = state.cartItem[index].price; // current price
      let totalPrice = qtnInc * price;
      state.cartItem[index].total = totalPrice; // update price
      localStorage.setItem("cartData", JSON.stringify(state.cartItem));
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex(
        (el: CartItem) => el._id === action.payload
      );
      let qtn = state.cartItem[index].qtn;

      if (qtn > 1) {
        const qtyDec = --qtn;
        state.cartItem[index].qtn = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
        localStorage.setItem("cartData", JSON.stringify(state.cartItem));
      } else {
        toast("No Item To Decrease");
      }
    },
    removeCartItem: (state, action) => {
      state.cartItem = action.payload;
      localStorage.removeItem("cartData");
    },
  },
});

export const {
  addSlice,
  deleteItem,
  increaseQtn,
  decreaseQty,
  removeCartItem,
} = cartSlice.actions;

export const selectUser = (state: RootState) => state.carts;

export default cartSlice.reducer;
