import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/behavior";
import behaviorOptions from "../../../utilities/button/config";
import ButtonComponent from "../../../utilities/ButtonComponent";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_PRODUCT_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants// Import your constants

export default function ProductMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const ProductPermissions = ModulePermissions({ moduleName: BACKEND_PRODUCT_MODULE_NAME});
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = ProductPermissions;

  const menuItems = [
    { path: "/create-item", text: "Create Product", canRender: canCreateModule },
    { path: "/delete-item", text: "Delete Product", canRender: canDeleteModule },
    { path: "/update-item", text: "Update Product", canRender: canUpdateModule },
    { path: "/list-products", text: "List Products", canRender: canViewModule },
  ];

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) =>
          item.canRender && (
            <ButtonComponent
              key={item.path}
              path={item.path}
              buttonText={item.text}
              onClick={() => handleMenuItemClick(item.path)}
            />
          )
        )}
      </div>
    </div>
  );
}
