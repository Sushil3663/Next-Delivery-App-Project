"use client";

import React from "react";
import ShoppingCart from "../_components/Cart";
import { RootState, useAppSelector } from "../_redux/store";
import { CartItem } from "../_components/common";

const Cart = () => {
  const cartDetail = useAppSelector(
    (state: RootState) => state?.carts?.cartItem
  );
  console.log(cartDetail);
  return (
    <>
      {cartDetail?.length > 0 ? (
        cartDetail?.map((item: CartItem, index: number) => (
          <ShoppingCart
            key={index}
            id={item._id}
            path={item.path}
            foodName={item.foodname}
            desc={item.desc}
            price={item.price}
            qtn={item.qtn}
            total={item.total}
            length={cartDetail.length}
          />
        ))
      ) : (
        <div className="container">
          <div className="item-not-found">
            <h1>No Food Item Added </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
