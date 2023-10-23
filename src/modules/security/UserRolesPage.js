import React, { useEffect } from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UserRolesMenu from "./menus/UserRolesMenu";
import PermissionsMenu from "./menus/PermissionsMenu";
import DisplayCard from "../utilities/DisplayCard";

export default function UserRolesPage() {
  useEffect(() => {
    // Log component rendering
    console.log(`[${new Date().toLocaleTimeString()}] UserRolePage component rendered.`);
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">Users and Permissions</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <h2 className="title">Menu</h2>
          <div className="menu-list-container">
            <DisplayCard title="Users" color="#4caf50">
              <UserRolesMenu />
            </DisplayCard>
            <DisplayCard title="Permissions" color="#2196f3">
              <PermissionsMenu />
            </DisplayCard>
          </div>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
