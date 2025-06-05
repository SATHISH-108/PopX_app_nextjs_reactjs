"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({ children }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastClassName="!mt-[62px]"
        className="!absolute !top-0 !left-0 !w-full"
      />
      {children}
    </>
  );
}
