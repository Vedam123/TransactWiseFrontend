import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../utilities/css/appcss.css";

export default function PermissionsMenu() {
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
    { path: "/load-all-modules", text: "Load modules" },
    { path: "/assign-user-modules", text: "Assign modules" },
    { path: "/create-permissions", text: "Grant Accesses" },
    { path: "/list-user-permissions", text: "List User Accesses" },
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
