import Image from "next/image";
import React from "react";
import delivery from "../../../public/delivery.png";
import Link from "next/link";

const CustomerHeader = () => {
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
          <li>
            <Link href={"/resturant"}>Login/SignUp</Link>
          </li>

          <li>
            <Link href={"#"}>Cart(0)</Link>
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
