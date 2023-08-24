import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import AssignUserModulesForm from "./forms/AssignUserModulesForm";
//import UserPermissionsForm from "./forms/ListUserPermissionsForm";

function AssignUserModules() {
  return (
    <div className="page-container">
      <h1 className="title">Assign Modules to Users</h1>

      <div className="parent-container">
        <AssignUserModulesForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default AssignUserModules;
