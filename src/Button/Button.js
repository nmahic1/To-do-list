import "./Button.css";
import React from "react";

function Button(props) {
  return (
    <button
      className={`button ${props.isSmall ? "button-small" : " "} ${
        props.isSelected ? "selected" : ""
      }`}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
    >
      {props.title || props.children}
    </button>
  );
}

export default Button;
