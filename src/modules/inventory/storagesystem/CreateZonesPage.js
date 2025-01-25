import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import CreateZonesForm from "./forms/CreateZonesForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function CreateZonesPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] CreateZonesForm component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [CreateZonesForm];
  const componentsToRender2 = [CreateZonesPage];

  return (
    <div className="page-container">
      <h1 className="title">Setup Zones</h1>

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

export default CreateZonesPage;
