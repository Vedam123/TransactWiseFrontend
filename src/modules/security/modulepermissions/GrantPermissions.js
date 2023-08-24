import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import GrantPermissionsForm from "./forms/GrantPermissionsForm";
//import UserPermissionsForm from "./forms/ListUserPermissionsForm";

function GrantPermissions() {
  return (
    <div className="page-container">
      <h1 className="title">Grant Permissions</h1>

      <div className="parent-container">
        <GrantPermissionsForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default GrantPermissions;
