"use client";
import {
  DetailResponse,
  FoodItem,
  ListResponsePayload,
} from "@/app/_components/common";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Fotter from "@/app/_components/Fotter";
import ItemDetail from "@/app/_components/ItemDetail";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  let { detailId } = useParams();
  //   console.log(detailId);
  const [foodItem, setFoodItem] = useState<FoodItem[]>([]);
  const [resturantDetail, setResturantDetail] = useState<ListResponsePayload>();

  console.log(foodItem);
  useEffect(() => {
    responseData();
  }, []);

  let responseData = async () => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/customer/${detailId}`,
        {
          method: "GET",
          headers: {
            contentType: "application/json",
          },
        }
      );
      let result: DetailResponse = await response.json();
      //   console.log(result);
      if (result?.success) {
        setFoodItem(result.foodItems);
        setResturantDetail(result?.payload);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <CustomerHeader />

      <div className="container">
        {
          <ul className="u-list">
            <li className="list">
              <p>Contact: {resturantDetail?.phone}</p>
            </li>
            <li className="list">
              <p>City: {resturantDetail?.city}</p>
            </li>
            <li className="list">
              <p>Address: {resturantDetail?.address}</p>
            </li>
            <li className="list">
              <p>Email: {resturantDetail?.email}</p>
            </li>
          </ul>
        }
        <div className="item-container">
          {foodItem.map((item) => (
            <ItemDetail
              foodname={item?.foodname}
              price={item?.price}
              path={item?.path}
              desc={item.desc}
              item={item}
            />
          ))}
        </div>
      </div>

      <Fotter />
    </>
  );
};

export default page;
