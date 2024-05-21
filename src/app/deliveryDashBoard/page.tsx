"use client";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { FoodItem, orderList } from "../_components/common";
import toast from "react-hot-toast";
import CustomerHeader from "../_components/CustomerHeader";
import Fotter from "../_components/Fotter";
// import "../../../app/_components/detail.css";
import "../../app/_components/detail.css";
const Dashboard = () => {
  const router = useRouter();

  let data = localStorage.getItem("delivery");
  let deliveryInfo = data && JSON.parse(data);
  useEffect(() => {
    if (!deliveryInfo) {
      router.push("/deliveryPartner");
    }
  }, []);
  const [foodDetail, setFoodDetail] = useState<FoodItem[]>();
  console.log(foodDetail);
  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch(
        `http://localhost:3000/api/order/663fac3e77fe0ca5be6bd2ba`,
        // `http://localhost:3000/api/order/${deliveryInfo?._id}`,
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
        console.log(apiResponse?.payload);
        setFoodDetail(apiResponse?.food);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <CustomerHeader />
        <div>
          <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
            Delivered Item List
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
    </div>
  );
};

export default Dashboard;
