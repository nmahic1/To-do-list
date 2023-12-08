import React from "react";
function Input(props) {
  return (
    <div>
      <label>{props.title}</label>
      {props.type === "select" ? (
        <select value={props.value} onChange={props.onChange}>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={props.type || "text"}
          min={0}
          max={100}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </div>
  );
}

export default Input;
