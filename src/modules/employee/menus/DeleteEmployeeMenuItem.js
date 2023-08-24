import React from "react";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent
import { useNavigate } from "react-router-dom";

export default function DeleteEmployeeMenu() {
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
        path="/delete-employee"
        buttonText="Delete Employee"
        onClick={() => handleMenuItemClick("/delete-employee")}
      />
  );
}
