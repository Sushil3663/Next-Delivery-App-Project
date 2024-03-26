import React, { ChangeEvent, useEffect, useState } from "react";
import { ApiResponse, FoodItem } from "./common";
import "./style.css";
import toast from "react-hot-toast";
interface IProps {
  initialData: FoodItem[];
}
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
const FoodItemList = ({ initialData }: IProps) => {
  const [data, setData] = useState<FoodItem[]>(initialData);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleEdit = async (id: string) => {
    let response = await fetch(`http://localhost:3000/api/addfoods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    let result: ApiResponse = await response.json();

    if (result?.success) {
      toast?.success(result?.message);
      const restaurantUserString = localStorage.getItem("resturantUser");
      const restaurantUser: Store = restaurantUserString
        ? JSON.parse(restaurantUserString)
        : null;
      const fetchData = async () => {
        let response = await fetch(
          `http://localhost:3000/api/addfoods/${restaurantUser?._id}`,
          {
            method: "GET",
            headers: {
              contentType: "application/json",
            },
          }
        );
        let result: ApiResponse = await response.json();
        setData(result?.data);
      };
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    console.log("delete", id);
    let response = await fetch(`http://localhost:3000/api/addfoods/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let result: ApiResponse = await response.json();
    console.log(result);
    if (result?.success) {
      toast?.success(result?.message);
      const restaurantUserString = localStorage.getItem("resturantUser");
      const restaurantUser: Store = restaurantUserString
        ? JSON.parse(restaurantUserString)
        : null;
      const fetchData = async () => {
        let response = await fetch(
          `http://localhost:3000/api/addfoods/${restaurantUser?._id}`,
          {
            method: "GET",
            headers: {
              contentType: "application/json",
            },
          }
        );
        let result: ApiResponse = await response.json();
        setData(result?.data);
      };
      fetchData();
    }
  };

  return (
    <table className="border-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: FoodItem, index) => (
          <tr key={item._id}>
            <td className="text-center">{index + 1}</td>

            <td>{item.foodname}</td>
            <td>{item.price}</td>
            <td>{item.desc}</td>
            <td>
              <img src={item.path} alt={item.foodname} style={{ width: 100 }} />
            </td>
            <td>
              <button type="button" onClick={() => handleDelete(item?._id)}>
                Delete
              </button>
              <button
                type="button"
                className="w-button"
                onClick={() => handleEdit(item?._id)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodItemList;
