"use client";
import React from "react";
import "./cart.css";
import { RootState, useAppDispatch, useAppSelector } from "../_redux/store";
import { decreaseQty, deleteItem, increaseQtn } from "../_redux/cartSlice";
import { useRouter } from "next/navigation";
import { CartItem, FoodItem } from "./common";
interface IProps {
  length: number;
}

const ShoppingCart = ({ length }: IProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = (removeId: string) => {
    dispatch(deleteItem(removeId));
  };
  const cartDetail = useAppSelector(
    (state: RootState) => state?.carts?.cartItem
  );
  console.log(cartDetail);

  const totalPrice = cartDetail?.reduce(
    (acc: number, item: CartItem) => acc + item?.total,
    100
  );
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDecrease = (decreaseId: string) => {
    dispatch(decreaseQty(decreaseId));
  };

  const handleIncrease = (increaseId: string) => {
    dispatch(increaseQtn(increaseId));
  };

  let userData = localStorage.getItem("user");
  let data = JSON.parse(userData as string);
  console.log(data);

  const handleOrder = () => {
    if (data?.email) {
      router.push("/order");
    } else {
      router.push("/userAuth?order=true");
    }
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
            {cartDetail?.map((item: CartItem, index: number) => (
              <div className="cart-item-flex">
                <div className="col-2">
                  <img className="img-fluid" src={item.path} />
                </div>
                <div className="col-detail">
                  <div className="row text-muted">
                    <h3>{item.foodname}</h3>
                  </div>
                  <div className="row">{item.desc}</div>
                </div>
                <div className="col-flex">
                  <p onClick={() => handleDecrease(item._id)}>-</p>
                  <p className="border">{item.qtn}</p>
                  <p onClick={() => handleIncrease(item._id)}>+</p>
                </div>
                <div>Rs. {item.price}</div>
                <div className="col">
                  <span
                    className="close"
                    onClick={() => handleRemove(item._id)}
                  >
                    &#10005;
                  </span>
                </div>
              </div>
            ))}

            <div className="back-to-shop" onClick={handleBack}>
              <a>&#x2190;</a>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="total-flex">
            <div className="summery">
              <h2>Summary</h2>
            </div>
            <hr />
            {cartDetail?.map((item: CartItem, index: number) => (
              <>
                <div className="item-detail">
                  <div className="">{item.foodname}</div>
                  <div className="price-start">Rs. {item.price}</div>
                </div>
              </>
            ))}

            <div className="price">
              <hr />
              <div className="item-price">
                <div className="">TOTAL PRICE</div>
                <div className="">Rs. {totalPrice}</div>
              </div>
            </div>
            <button className="btn" onClick={handleOrder}>
              <b>Order Now</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
