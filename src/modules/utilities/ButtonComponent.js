import React from "react";
import "../utilities/css/appcss.css";

export default function ButtonComponent({ path, buttonText, onClick }) {
  return (
    <button className="menu-button" onClick={onClick}>
      <span className="button-text">{buttonText}</span>
    </button>
  );
}
