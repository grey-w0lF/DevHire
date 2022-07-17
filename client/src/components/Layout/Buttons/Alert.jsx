import React from "react";
import { ToastContainer } from "react-toastify";
import "./BTNSTYLES.css";

const Alert = (props) => {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={5}
        toastStyle={{
          fontSize: "1.6rem",
        }}
      />
    </div>
  );
};

export default Alert;
