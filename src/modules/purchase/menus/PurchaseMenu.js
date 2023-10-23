import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../utilities/button/behaviorOptions";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import { BACKEND_PURCHASE_MODULE_NAME } from "../../admin/setups/ConstDecl"; // Import your constants
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function PurchaseMenu({ group }) {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const ProductPermissions = ModulePermissions({ moduleName: BACKEND_PURCHASE_MODULE_NAME });
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = ProductPermissions;

  const menuItems = [
    { path: "/create-pur-req", text: "Create Pur Req", canRender: canCreateModule },
    { path: "/view-pur-reqs", text: "View Purchase Reqs", canRender: canViewModule },
    { path: "/update-pur-req", text: "Update Pur Req", canRender: canUpdateModule },
    { path: "/delete-pur-req", text: "Delete Purchase Req", canRender: canDeleteModule },

    { path: "/create-rfq", text: "Create RFQ", canRender: canCreateModule },
    { path: "/view-rfqs", text: "View RFQs", canRender: canViewModule },
    { path: "/update-rfq", text: "Update RFQs", canRender: canUpdateModule },
    { path: "/delete-rfq", text: "Delete RFQ", canRender: canDeleteModule },

    { path: "/create-po", text: "Create PO", canRender: canCreateModule },
    { path: "/view-pos", text: "View POs", canRender: canViewModule },
    { path: "/update-po", text: "Update PO", canRender: canUpdateModule },
    { path: "/delete-po", text: "Delete PO", canRender: canDeleteModule },
  ];

  // Filter menu items based on the group
  const filteredMenuItems = menuItems.filter((item) => item.path.includes(group.toLowerCase()));

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

  // Log the component rendering with timestamp and group
  logger.info(`[${new Date().toLocaleTimeString()}] PurchaseMenu component is rendering for group: ${group}`);

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {filteredMenuItems.map((item) =>
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
    </div>
  );
}
