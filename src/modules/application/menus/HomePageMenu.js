import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import { BACKEND_PRODUCT_MODULE_NAME, 
        BACKEND_ADMIN_MODULE_NAME, 
        BACKEND_COMMON_MODULE_NAME, 
        BACKEND_INVENTORY_MODULE_NAME, 
        BACKEND_PURCHASE_MODULE_NAME, 
        BACKEND_SALES_MODULE_NAME, 
        BACKEND_FINANCE_MODULE_NAME } from "../../admin/setups/ConstDecl"; // Import your constants// Import your constants


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
    { path: "/admin-module", text: "Admin & Setups", moduleName: BACKEND_ADMIN_MODULE_NAME },
    { path: "/common-module", text: "Common", moduleName: BACKEND_COMMON_MODULE_NAME },
    { path: "/products-module", text: "Products", moduleName: BACKEND_PRODUCT_MODULE_NAME },
    { path: "/inventory-module", text: "Inventory", moduleName: BACKEND_INVENTORY_MODULE_NAME },
    { path: "/purchase-module", text: "Purchase", moduleName: BACKEND_PURCHASE_MODULE_NAME },
    { path: "/sales-module", text: "Sales", moduleName: BACKEND_SALES_MODULE_NAME },
    { path: "/finance-module", text: "Finance", moduleName: BACKEND_FINANCE_MODULE_NAME },
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
