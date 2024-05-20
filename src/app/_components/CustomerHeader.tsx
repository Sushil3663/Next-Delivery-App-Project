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
  console.log(data);

  const cartDetail = useAppSelector(
    (state: RootState) => state?.carts?.cartItem
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/userAuth");
  };

  const handleProfile = () => {
    let user_id = data?._id;

    router.push(`/profile/${user_id}`);
  };
  return (
    <div className="header-wrapper">
      <div className="image">
        <Image src={delivery} alt="image" width={80} height={50} />
      </div>
      <div className="route-list">
        <ul>
          <li>
            <Link href={"/"} style={{ color: "purple" }}>
              Home
            </Link>
          </li>
          <li>
            <Link href={"/cart"} style={{ color: "purple" }}>
              Cart({cartDetail?.length})
            </Link>
          </li>

          <li>
            <Link href={"/"} style={{ color: "purple" }}>
              Add Resturant
            </Link>
          </li>
          <li>
            <Link href={"/deliveryPartner"} style={{ color: "purple" }}>
              Delivery Partner
            </Link>
          </li>
          {data && data?.name ? (
            <li>
              <button onClick={handleProfile} style={{ color: "blue" }}>
                {data?.name}
              </button>
              <button onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href={"/userAuth"} style={{ color: "blue" }}>
                Login/SignUp
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
