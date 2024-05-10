"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
const ResturantSignUp = () => {
  let router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    city: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState<boolean>(false);
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
    // console.log(data);
    const { email, password, cpassword, name, city, address, phone } = data;
    if (password === cpassword) {
      setError(false);
      let response = await fetch("http://localhost:3000/api/resturant", {
        method: "POST",
        body: JSON.stringify({ email, password, name, city, address, phone }),
      });
      const apiResponse: MyApiResponse = await response.json();
      if (apiResponse?.success) {
        // console.log(apiResponse?.payload?.password);
        delete apiResponse?.payload?.password;
        localStorage.setItem(
          "resturantUser",
          JSON.stringify(apiResponse?.payload)
        );
        alert("sign up successful");
        router.push("/resturant/dashboard");
      }
    } else {
      setError(true);
    }
  };
  return (
    <div className="rest-log">
      <div className="login">
        <h3 className="login-header">User Page</h3>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data?.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
            name="email"
            value={data?.email}
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={data?.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {error && (
            <span style={{ color: "red" }}>
              Password and C_Password does not match!
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            value={data?.cpassword}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {error && (
            <span style={{ color: "red" }}>
              Password and C_Password does not match!
            </span>
          )}

          <input
            type="text"
            placeholder="Enter city"
            name="city"
            value={data?.city}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Enter address"
            name="address"
            value={data?.address}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Contact Number"
            name="phone"
            value={data?.phone}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default ResturantSignUp;
