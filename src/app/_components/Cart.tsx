"use client";
import React from "react";
import "./cart.css";
import { useAppDispatch } from "../_redux/store";
import { deleteItem } from "../_redux/cartSlice";
interface IProps {
  id: string;
  path: string;
  foodName: string;
  desc: string;
  price: number;
  qtn: number;
  total: number;
  length: number;
}

const ShoppingCart = ({
  id,
  path,
  foodName,
  desc,
  price,
  qtn,
  total,
  length,
}: IProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = (removeId: string) => {
    dispatch(deleteItem(removeId));
  };
  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-card">
          <div className="title-flex">
            <div className="title-item-flex">
              <h2>Shoping Cart</h2>
              <h4>{length} Food Item</h4>
            </div>

            <hr />
            <div className="cart-item-flex">
              <div className="col-2">
                <img className="img-fluid" src={path} />
              </div>
              <div className="col">
                <div className="row text-muted">
                  <h3>{foodName}</h3>
                </div>
                <div className="row">{desc}</div>
              </div>
              <div className="col">
                <a href="#">-</a>
                <a href="#" className="border">
                  {qtn}
                </a>
                <a href="#">+</a>
              </div>
              <div>Rs. {price}</div>
              <div className="col">
                <span className="close" onClick={() => handleRemove(id)}>
                  &#10005;
                </span>
              </div>
            </div>
            <div className="back-to-shop">
              <a href="">&#x2190;</a>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="total-flex">
            <div className="summery">
              <h2>Summary</h2>
            </div>
            <hr />
            <div className="item-detail">
              <div className="">{foodName}</div>
              <div className="">Rs. {price}</div>
            </div>

            <div className="price">
              <hr />
              <div className="item-price">
                <div className="">TOTAL PRICE</div>
                <div className="">Rs. {total}</div>
              </div>
            </div>
            <button className="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
