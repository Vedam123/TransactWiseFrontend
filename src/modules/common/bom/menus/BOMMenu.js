import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/behavior";
import behaviorOptions from "../../../utilities/button/config";
import ButtonComponent from "../../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions"; // Import the ModulePermissions hook
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants// Import your constants

export default function BOMMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  // Get the permissions from ModulePermissions hook

  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME, // Set the module name as needed
  });

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    { path: "/bom-explosion", text: "Explode BOM", canRender: canViewModule }, // Add the "canRender" property
    // ... add more menu items here
  ];

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => (
          item.canRender && (
            <ButtonComponent
              key={item.path}
              path={item.path}
              buttonText={item.text}
              onClick={() => handleMenuItemClick(item.path)}
            />
          )
        ))}
      </div>
    </div>
  );
}
