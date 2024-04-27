"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ApiResponse,
  EditResponse,
  FoodItem,
  MyApiResponse,
} from "@/app/_components/common";
import { useParams, useRouter } from "next/navigation";

interface Store {
  email: string;
  password?: string;
  rname: string;
  city: string;
  address: string;
  phone: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const EditFoodItem = () => {
  const [data, setData] = useState({
    foodname: "",
    price: "",
    path: "",
    desc: "",
  });

  const router = useRouter();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    let response = await fetch(
      `http://localhost:3000/api/addfoods/EditFood/${id}`,
      {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
      }
    );
    let result: EditResponse = await response.json();
    setData((prev) => {
      return {
        ...prev,
        foodname: result?.data.foodname,
        price: String(result?.data?.price),
        path: result?.data?.path,
        desc: result?.data?.desc,
      };
    });
    console.log(result);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { foodname, price, path, desc } = data;
    console.log(data);
    let response = await fetch(
      `http://localhost:3000/api/addfoods/EditFood/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodname, price, path, desc }),
      }
    );
    let result: EditResponse = await response.json();

    if (result?.success) {
      toast?.success(result?.message);
      router.push("/resturant/dashboard");
    }
  };

  return (
    <div>
      <div className="rest-log">
        <div className="login">
          <h3 className="login-header">Add Food Item</h3>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Enter Food Name"
              onChange={handleChange}
              name="foodname"
              value={data?.foodname}
              required
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Enter Price"
              onChange={handleChange}
              name="price"
              value={data?.price}
              required
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="Enter path"
              onChange={handleChange}
              name="path"
              value={data?.path}
              required
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="Enter Description"
              onChange={handleChange}
              name="desc"
              value={data?.desc}
              required
              autoComplete="off"
            />

            <button type="submit">Update Food Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoodItem;
