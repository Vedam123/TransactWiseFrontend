import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent


export default function UpdateProductMenuItem() {
  const openInNewTab = useButtonBehavior();
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  return (
      <ButtonComponent
        path="/update-item"
        buttonText="Update Product"
        onClick={() => handleMenuItemClick("/update-item")}
      />
  );
}
