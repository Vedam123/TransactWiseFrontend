import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";


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

  // Define the menu items with their module names
  const menuItems = [
    { path: "/admin-module", text: "Admin & Setups", moduleName: "admin" },
    { path: "/common-module", text: "Common", moduleName: "common" },
    { path: "/products-module", text: "Products", moduleName: "products" },
    { path: "/inventory-module", text: "Inventory", moduleName: "inventory" },
    { path: "/purchase-module", text: "Purchase", moduleName: "purchase" },
    { path: "/sales-module", text: "Sales", moduleName: "sales" },
    { path: "/finance-module", text: "Finance", moduleName: "finance" },
    { path: "/cash-management-module", text: "Cash Management", moduleName: "cmg" },
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


        /* console.log("MenuItem:", item);
          console.log("Module Permissions:", modulePermissions);
          console.log("canViewModule:", canViewModule);
          console.log("canCreateModule:", canCreateModule);
          console.log("canDeleteModule:", canDeleteModule);
          console.log("canUpdateModule:", canUpdateModule);
          // Check for permission and render the button if allowed 
          */
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
