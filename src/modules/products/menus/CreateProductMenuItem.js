import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent


export default function CreateProductMenuItem() {
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
        path="/create-items"
        buttonText="Create Product"
        onClick={() => handleMenuItemClick("/create-items")}
      />
  );
}
