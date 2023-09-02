import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/behavior";
import behaviorOptions from "../../utilities/button/config";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";

export default function EmployeeMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const employeePermissions = ModulePermissions({ moduleName: "employee" });
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = employeePermissions;

  const menuItems = [
    { path: "/create-employee", text: "Create Employee", canRender: canCreateModule },
    { path: "/delete-employee", text: "Delete Employee", canRender: canDeleteModule },
    { path: "/update-employee", text: "Update Employee", canRender: canUpdateModule },
    { path: "/list-employees", text: "List Employees", canRender: canViewModule },
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
