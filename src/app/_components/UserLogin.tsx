"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
interface MyApiResponse {
  payload: {
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
  };
  success: boolean;
  message: string;
}
const UserLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { email, password } = data;

    let response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let apiResponse: MyApiResponse = await response.json();

    if (apiResponse?.success) {
      delete apiResponse?.payload?.password;
      localStorage.setItem("user", JSON.stringify(apiResponse?.payload));
      toast("Login successful");
      router.push("/");
    }
  };
  return (
    <div className="rest-log">
      <div className="login">
        <h3 className="login-header">Login Page</h3>
        <form onSubmit={handleSubmit} className="flex-login">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
