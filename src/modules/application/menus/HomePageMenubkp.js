import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent

export default function HomePageMenu() {
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
    { path: "/admin-module", text: "Admin & Setups" },
    { path: "/common-module", text: "Common" },
    { path: "/products-module", text: "Products" },
    { path: "/inventory-module", text: "Inventory" },
    { path: "/purchase-module", text: "Purchase" },
    { path: "/sales-module", text: "Sales" },
    { path: "/finance-module", text: "Finance" },
    { path: "/projects-module", text: "Projects" },
    { path: "/service-module", text: "Service" },
    { path: "/cash-management-module", text: "Cash Management" },                       
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
