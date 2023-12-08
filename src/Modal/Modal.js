import "./Modal.css";
import React from "react";
function Modal(props) {
  return (
    <div className="modal-container">
      <div className="back-drop" onClick={props.close}></div>
      <div className="content">
        <div className="close" onClick={props.close}>
          X
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
