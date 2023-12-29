import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const showToast = (message, type = "success") => {
    // Display the toast message
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warn":
        toast.warn(message);
        break;
      default:
        toast(message);
    }
  };

  const ToastContainerComponent = () => (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // theme={theme === "light" ? "dark" : "light"}
    />
  );

  return {
    showToast,
    ToastContainerComponent,
  };
};

export default useToast;
