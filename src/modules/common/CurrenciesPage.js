import React from "react";
import CreateEmployeeMenuItem from "./menus/CreateEmployeeMenuItem";
import UpdateEmployeeMenuItem from "./menus/UpdateEmployeeMenuItem";
import DeleteEmployeeMenuItem from "./menus/DeleteEmployeeMenuItem";
import ViewAllEmployeesMenuItem from "./menus/ViewAllEmployeesMenuItem";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import ModulePermissions from "../security/modulepermissions/ModulePermissions";
import DisplayCard from "../utilities/DisplayCard";

export default function EmployeePage() {
  //alert("Entered Employee Page");
  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
    ModulePermissions({
      moduleName: "employee", // Provide the appropriate module name
    });

  return (
    <div className="page-container">
      <h1 className="title">Employee</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="View Employee Data" color="#FFD799">
            <div className="child-container form-container">
              <div className="menu-list">
                {canViewModule && <ViewAllEmployeesMenuItem />}
                {canCreateModule && <CreateEmployeeMenuItem />}
                {canDeleteModule && <DeleteEmployeeMenuItem />}
                {canUpdateModule && <UpdateEmployeeMenuItem />}
              </div>
            </div>
          </DisplayCard>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
