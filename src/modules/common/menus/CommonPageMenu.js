import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";


export default function CommonPageMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  // Define the menu items with their module names
  const menuItems = [
    { path: "/currencies-page", text: "Currencies", moduleName: "common" },
    { path: "/taxcodes-page", text: "Tax Codes", moduleName: "common" },
    { path: "/exchangerates-page", text: "Exchange Rates", moduleName: "common" },
    { path: "/uom-page", text: "Unit of Measure", moduleName: "common" },
    { path: "/bom-page", text: "Bill of Materials", moduleName: "common" },
    // ... add more menu items here
  ];

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => {
          // Retrieve permissions for the current module name
          const modulePermissions = ModulePermissions({
            moduleName: item.moduleName,
          });

          // Destructure module permissions
          const {
            canViewModule,
            canCreateModule,
            canDeleteModule,
            canUpdateModule,
          } = modulePermissions;

          // Check if any permissions are granted for the module
          const isModulePermissionGranted =
            canViewModule ||
            canCreateModule ||
            canDeleteModule ||
            canUpdateModule;

          // Check for permission and render the button if allowed
          return (
            isModulePermissionGranted && (
              <ButtonComponent
                key={item.path}
                path={item.path}
                buttonText={item.text}
                onClick={() => handleMenuItemClick(item.path)}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
