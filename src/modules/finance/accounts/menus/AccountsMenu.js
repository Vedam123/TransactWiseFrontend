import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_PRODUCT_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

export default function AccountsMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const ProductPermissions = ModulePermissions({ moduleName: BACKEND_PRODUCT_MODULE_NAME });
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = ProductPermissions;

  const menuItems = [
    { path: "/create-account", text: "Create Account", canRender: canCreateModule },
    { path: "/delete-account", text: "Delete Account", canRender: canDeleteModule },
    { path: "/update-account", text: "Update Account", canRender: canUpdateModule },
    { path: "/get-accounts", text: "Get Accounts", canRender: canViewModule },
    { path: "/search-default-accounts", text: "Get Default Accounts", canRender: canViewModule },
    { path: "/create-default-accounts", text: "Create Default Accounts", canRender: canCreateModule },
    // { path: "/company-default-accounts", text: "Company Default Accounts", canRender: canCreateModule },
  ];

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
      // Log the action of opening a new tab with timestamp
      logger.debug(`[${new Date().toLocaleTimeString()}] Opened tab: ${path}`);
    } else {
      navigate(path);
      // Log the navigation action with timestamp
      logger.info(`[${new Date().toLocaleTimeString()}] Navigated to: ${path}`);
    }
  };

  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Accounts component is rendering.`);

  return (

    <div className="menu-list">
      {menuItems.map((item) =>
        item.canRender && (
          <ButtonComponent
            key={item.path}
            path={item.path}
            buttonText={item.text}
            onClick={() => {
              handleMenuItemClick(item.path);
              // Log the button click action with timestamp
              logger.info(`[${new Date().toLocaleTimeString()}] Clicked button: ${item.text}`);
            }}
          />
        )
      )}
    </div>

  );
}
