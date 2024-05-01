"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
const ReduxContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default ReduxContainer;
