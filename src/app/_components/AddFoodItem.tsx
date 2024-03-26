import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MyApiResponse } from "./common";
import toast from "react-hot-toast";

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
const AddFoodItem = () => {
  const [data, setData] = useState({
    foodname: "",
    price: "",
    path: "",
    desc: "",
  });

  const [id, setId] = useState<string>("");
  useEffect(() => {
    const restaurantUserString = localStorage.getItem("resturantUser");
    const restaurantUser: Store = restaurantUserString
      ? JSON.parse(restaurantUserString)
      : null;

    // console.log(restaurantUser?._id);
    // console.log(restaurantUser);
    setId(restaurantUser?._id);
  }, []);

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

    let response = await fetch("http://localhost:3000/api/addfoods", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({
        foodname,
        price,
        path,
        desc,
        resto_id: id,
      }),
    });

    let apiResponse: MyApiResponse = await response.json();
    if (apiResponse?.success) {
      // alert("Food Item successfully added!");
      toast?.success(apiResponse?.message);
      setData({
        foodname: "",
        price: "",
        path: "",
        desc: "",
      });
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

            <button type="submit">Add Food Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
