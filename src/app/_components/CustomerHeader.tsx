"use client";
import Image from "next/image";
import React from "react";
import delivery from "../../../public/delivery.png";
import Link from "next/link";
import { RootState, useAppSelector } from "../_redux/store";
import { useRouter } from "next/navigation";

const CustomerHeader = () => {
  const router = useRouter();
  let userData = localStorage.getItem("user");
  let data = JSON.parse(userData as string);
  // console.log(data);

  const cartDetail = useAppSelector(
    (state: RootState) => state?.carts?.cartItem
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/userAuth");
  };
  return (
    <div className="header-wrapper">
      <div className="image">
        <Image src={delivery} alt="image" width={80} height={50} />
      </div>
      <div className="route-list">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {data && data?.name ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link href={"/userAuth"}>Login/SignUp</Link>
            </li>
          )}

          <li>
            <Link href={"/cart"}>Cart({cartDetail?.length})</Link>
          </li>

          <li>
            <Link href={"#"}>Add Resturant</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
