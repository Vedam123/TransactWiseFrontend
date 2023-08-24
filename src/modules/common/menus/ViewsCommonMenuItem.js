import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../utilities/css/appcss.css";

export default function ViewCommonPageMenuItems() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    { path: "/list-uoms", text: "Unit of Measures" },
    { path: "/list-currencies", text: "Currencies" },
    { path: "/list-tax-codes", text: "Tax Codes" },
    { path: "/list-exchange-rates", text: "Exchange Rates" },
    { path: "/bom-explosion", text: "Explode BOM" },
    // ... add more menu items here
  ];

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => (
          <ButtonComponent
            key={item.path}
            path={item.path}
            buttonText={item.text}
            onClick={() => handleMenuItemClick(item.path)}
          />
        ))}
      </div>
    </div>
  );
}
