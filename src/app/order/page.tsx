"use client";
import React from "react";
import { RootState, useAppDispatch, useAppSelector } from "../_redux/store";
import {
  CartItem,
  deliveryResponse,
  orderResponse,
  partnerIds,
  partnerResponse,
} from "../_components/common";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";
import toast from "react-hot-toast";
import { removeCartItem } from "../_redux/cartSlice";
import { useRouter } from "next/navigation";
import { request } from "http";
const page = () => {
  const router = useRouter();
  let userData = localStorage.getItem("user");
  let data = JSON.parse(userData as string);
  // console.log(data);
  const cartDetail = useAppSelector(
    (state: RootState) => state?.carts?.cartItem
  );
  console.log(cartDetail);
  const dispatch = useAppDispatch();
  const totalPrice = cartDetail?.reduce(
    (acc: number, item: CartItem) => 100 + acc + item?.total,
    0
  );

  const handleOrder = async () => {
    let user_id = data?._id;
    let city = data?.city;
    console.log(city);
    let resto_id = cartDetail[0]?.resto_id;
    // console.log(cartDetail);
    let foodItemsIds = cartDetail?.map((item: CartItem) => item._id);

    let deliveryBoy = await fetch(
      `http://localhost:3000/api/deliveryPartnersSignUp/` + city,
      {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      }
    );
    let deliveryBoyResponse: partnerIds = await deliveryBoy.json();
    // let deliveryBoy_id = "663fac3e77fe0ca5be6bd2ba";
    console.log(deliveryBoyResponse);
    let deliveryBoy_ids = deliveryBoyResponse?.payload?.map(
      (item: partnerResponse) => item._id
    );
    let deliveryBoy_id =
      deliveryBoy_ids[Math.floor(Math.random() * deliveryBoy_ids.length)];
    console.log(deliveryBoy_id);
    if (!deliveryBoy_id) {
      toast.error("Delivery Boy not found");
    }
    let status = "confirm";
    let amount = totalPrice;
    console.log(user_id, resto_id, foodItemsIds);
    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({
        user_id,
        foodItemsIds,
        resto_id,
        deliveryBoy_id,
        status,
        amount,
      }),
    });

    let apiResponse: orderResponse = await response.json();
    if (apiResponse?.success) {
      toast?.success(apiResponse?.message);
      dispatch(removeCartItem([]));
      router.push(`/profile/${user_id}`);
    }
  };
  return (
    <>
      <div className="container">
        <CustomerHeader />
        <div className="cardss">
          <div className="content">
            <div className="title">Delivery Amount: Rs. 100</div>
            <div className="prices">Total Amount: Rs. {totalPrice}</div>
            <div className="description">
              <p>Name: {data?.name}</p>
              <p style={{ marginTop: "5px" }}>
                Address: {data?.city}, {data?.address}
              </p>
            </div>
            <p style={{ marginTop: "5px" }}>
              <h2 style={{ color: "red" }}>
                Cash On Delivery: Rs. {totalPrice}
              </h2>
            </p>
          </div>
          <button onClick={handleOrder} style={{ cursor: "pointer" }}>
            Order Now
          </button>
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default page;
