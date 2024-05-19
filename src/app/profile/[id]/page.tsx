"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../../_components/CustomerHeader";
import Fotter from "../../_components/Fotter";
import toast from "react-hot-toast";
import { FoodItem, orderList } from "../../_components/common";
import { useParams } from "next/navigation";
import OrderCard from "@/app/_components/OrderDetail";
import "../../../app/_components/detail.css";

const Profile = () => {
  const { id } = useParams();

  const [foodDetail, setFoodDetail] = useState<FoodItem[]>();
  console.log(foodDetail);
  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch(
        `http://localhost:3000/api/order?userId=${id}`,
        {
          method: "GET",
          headers: {
            contentType: "application/json",
          },
        }
      );

      let apiResponse: orderList = await response.json();
      if (apiResponse?.success) {
        toast?.success(apiResponse?.message);
        setFoodDetail(apiResponse?.food);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <CustomerHeader />
      <div>
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Order Items
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {foodDetail?.map((food) => (
          <div className="cards">
            <div className="card-img">
              <img src={food?.path} alt="img" loading="lazy" />
            </div>
            <div className="card-info">
              <p className="text-title">{food?.foodname} </p>
              <p className="text-body">{food?.desc}</p>
            </div>
            <div className="card-footer">
              <span className="text-title">Rs. {food?.price}</span>
              <div className="card-button"></div>
            </div>
          </div>
        ))}
      </div>
      <Fotter />
    </div>
  );
};

export default Profile;
