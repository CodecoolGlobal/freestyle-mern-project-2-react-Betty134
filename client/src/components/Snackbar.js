import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowScnakbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
        setShowScnakbar(true);
        setTimeout(() => {
            setShowScnakbar(false)
        }, 4000);
    },
  }))

  return (
    <div
      className="snackbar"
      id={showSnackbar ? "show" : "hidden"}
      style={
        { backgroundColor: props.type === "success" ? "yellowgreen" : 'red', 
        color: props.type === "success" ? "black" : 'white',}
    }
    >
      <div className="symbol">
        {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
})

export default Snackbar;
