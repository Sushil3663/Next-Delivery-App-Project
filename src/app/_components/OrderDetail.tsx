import React from "react";
import "./detail.css";

interface IProps {
  foodname: string;
  price: number;
  path: string;
  desc: string;
}
const OrderCard = ({ foodname, price, path, desc }: IProps) => {
  return (
    <div className="d-flex">
      <div className="cards">
        <div className="card-img">
          <img src={path} alt="img" />
        </div>
        <div className="card-info">
          <p className="text-title">{foodname} </p>
          <p className="text-body">{desc}</p>
        </div>
        <div className="card-footer">
          <span className="text-title">Rs. {price}</span>
          <div className="card-button"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
