import React from "react";
import { Toaster } from "react-hot-toast";

const ToastContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default ToastContainer;
