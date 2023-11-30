import React from "react";
import CreateLegalEntityForm from "./forms/CreateLegalEntityForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function CreateLegalEntityPage() {
  // Log a message with the current time when entering the CreatePartnerPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered CreatePartnerPage`);

  // Define the list of components to render
  const componentsToRender = [CreateLegalEntityForm];
  const componentsToRender2 = [CreateLegalEntityPage];

  return (
    <div className="page-container">
      <h1 className="title">Create Legal Entity</h1>

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

export default CreateLegalEntityPage;
