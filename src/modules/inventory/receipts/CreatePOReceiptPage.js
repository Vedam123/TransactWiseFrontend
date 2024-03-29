import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import CreatePOReceiptForm from "./forms/CreatePOReceiptForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function CreatePOReceiptPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] CreateReceiptPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [CreatePOReceiptForm];
  const componentsToRender2 = [CreatePOReceiptPage];

  return (
    <div className="page-container">
      <h1 className="title">Receipts</h1>

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

export default CreatePOReceiptPage;
