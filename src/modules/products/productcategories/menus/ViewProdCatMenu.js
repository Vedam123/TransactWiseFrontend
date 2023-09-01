import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/behavior";
import behaviorOptions from "../../../utilities/button/config";
import ButtonComponent from "../../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../../utilities/css/appcss.css";

export default function ViewProdCatMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  return (
    <ButtonComponent
      path="/list-product-categories"
      buttonText="View Product Categories"
      onClick={() => handleMenuItemClick("/list-product-categories")}
    />
  );
}
