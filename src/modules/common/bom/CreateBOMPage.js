import React from "react";
import CreateBOMForm from "./forms/CreateBOMForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function CreateBOMPage() {
  // Log a message with the current time when entering the CreatePartnerPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered CreateBOMPage`);

  // Define the list of components to render
  const componentsToRender = [CreateBOMForm];
  const componentsToRender2 = [CreateBOMPage];

  return (
    <div className="page-container">
      <h1 className="title">Create BOM</h1>

      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer
          componentNames={componentsToRender2.map((component) => component.name)}
        />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default CreateBOMPage;
