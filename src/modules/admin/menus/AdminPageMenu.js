import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";

export default function AdminPageMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  // Retrieve employee and security permissions
  const employeePermissions = ModulePermissions({
    moduleName: "employee",
  });

  const securityPermissions = ModulePermissions({
    moduleName: "security",
  });

  const adminPermissions = ModulePermissions({
    moduleName: "admin",
  });

  // Destructure permissions for better readability
  const {
    canViewModule: canViewEmployeeModule,
    canCreateModule: canCreateEmployeeModule,
    canDeleteModule: canDeleteEmployeeModule,
    canUpdateModule: canUpdateEmployeeModule,
  } = employeePermissions;

  const {
    canViewModule: canViewSecurityModule,
    canCreateModule: canCreateSecurityModule,
    canDeleteModule: canDeleteSecurityModule,
    canUpdateModule: canUpdateSecurityModule,
  } = securityPermissions;

  const {
    canViewModule: canViewAdminModule,
    canCreateModule: canCreateAdminModule,
    canDeleteModule: canDeleteAdminModule,
    canUpdateModule: canUpdateAdminModule,
  } = adminPermissions;

  // Check if any permissions are granted
  const isEmployeePermissionGranted =
    canViewEmployeeModule ||
    canCreateEmployeeModule ||
    canDeleteEmployeeModule ||
    canUpdateEmployeeModule;

  const isSecurityPermissionGranted =
    canViewSecurityModule ||
    canCreateSecurityModule ||
    canDeleteSecurityModule ||
    canUpdateSecurityModule;

  const isAdminPermissionGranted =
    canViewAdminModule ||
    canCreateAdminModule ||
    canDeleteAdminModule ||
    canUpdateAdminModule;

  const menuItems = [
    { path: "/employee-functions", text: "Employee" },
    { path: "/user-functions", text: "Users&Accesses" },
    { path: "/view-emails-function", text: "View Emails" },
    { path: "/change-setups", text: "Create Setups" },
    { path: "/list-setups", text: "Config Setup File" },
    // ... add more menu items here
  ];

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) =>
          // Check for permission and render the button if allowed
          (item.path === "/employee-functions" && isEmployeePermissionGranted) ||
          (item.path === "/user-functions" && isSecurityPermissionGranted) ||
          (item.path === "/view-emails-function" && isAdminPermissionGranted) ||
          (item.path === "/change-setups" && isAdminPermissionGranted) || 
          (item.path === "/list-setups" && isAdminPermissionGranted) ? (
            <ButtonComponent
              key={item.path}
              path={item.path}
              buttonText={item.text}
              onClick={() => handleMenuItemClick(item.path)}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
