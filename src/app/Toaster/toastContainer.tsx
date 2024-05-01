import React from "react";
import { Toaster } from "react-hot-toast";
import ReduxContainer from "../_redux/ReduxContainer";

const ToastContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Toaster />
      <ReduxContainer>{children}</ReduxContainer>
    </div>
  );
};

export default ToastContainer;
