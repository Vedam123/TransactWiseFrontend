import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import MoveInventoryForm from "./forms/MoveInventoryForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function MoveInventoryPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Move Inventory.`);

  // Define the list of components to render
  const componentsToRender = [MoveInventoryForm];
  const componentsToRender2 = [MoveInventoryPage];

  return (
    <div className="page-container">
      <h1 className="title">Move Inventory</h1>

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

export default MoveInventoryPage;
