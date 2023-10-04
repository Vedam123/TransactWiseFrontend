import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/behavior";
import behaviorOptions from "../../../utilities/button/config";
import ButtonComponent from "../../../utilities/ButtonComponent";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants// Import your constants

export default function BusinessPartnerMenu() {
  const { canViewModule, canCreateModule } = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME,
  });
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
    { path: "/list-businesspartners", text: "List Business Partners", canRender: canViewModule },
    { path: "/create-businesspartner", text: "Create Business Partner", canRender: canCreateModule },
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
