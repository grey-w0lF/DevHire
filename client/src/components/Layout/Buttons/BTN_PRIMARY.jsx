import { React, useState } from "react";
import "./BTNSTYLES.css";

const BTN_PRIMARY = (props) => {
  return (
    <div>
      <button
        className={`${props.className}  btnPrimary`}
        type={props.type}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </div>
  );
};

export default BTN_PRIMARY;
