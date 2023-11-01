import React, { useEffect } from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UserRolesMenu from "./menus/UserRolesMenu";
import PermissionsMenu from "./menus/PermissionsMenu";
import DisplayCard from "../utilities/DisplayCard";

// Define an array of components to render
const componentsToRender = [UserRolesMenu, PermissionsMenu];

// Define an array of components for componentsToRender2
const componentsToRender2 = [UserRolesPage];

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
            {componentsToRender.map((Component, index) => (
              <DisplayCard
                key={index}
                title={Component.name}
                color="#4caf50" // You can set colors dynamically if needed
              >
                <Component />
              </DisplayCard>
            ))}
          </div>
        </div>
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
