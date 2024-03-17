import React, { ChangeEvent, FormEvent, useState } from "react";

const AddFoodItem = () => {
  const [data, setData] = useState({
    foodname: "",
    price: "",
    path: "",
    desc: "",
  });

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
