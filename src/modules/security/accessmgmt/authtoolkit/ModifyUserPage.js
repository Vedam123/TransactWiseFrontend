import React from "react";
import "../../../utilities/css/appcss.css";
import RotatingImage from "../../../utilities/RotatingImage";
import BottomContainer from "../../../utilities/BottomContainer";
import DocumentationContainer from "../../../utilities/DocumentationContainer";
import ModifyUserForm from "./forms/ModifyUserForm";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function ModifyUserPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ModifyUserPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [ModifyUserForm];
  const componentsToRender2 = [ModifyUserPage];

  return (
    <div className="page-container">
      <h1 className="title">Update User</h1>

      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer componentNames={componentsToRender2.map((component) => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ModifyUserPage;
