import React from "react";
import CreatePartnerForm from "./forms/CreatePartnerForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function CreatePartnerPage() {
  // Log a message with the current time when entering the CreatePartnerPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered CreatePartnerPage`);

  // Define the list of components to render
  const componentsToRender = [CreatePartnerForm];
  const componentsToRender2 = [CreatePartnerPage];

  return (
    <div className="page-container">
      <h1 className="title">Create Business Partner</h1>

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

export default CreatePartnerPage;
