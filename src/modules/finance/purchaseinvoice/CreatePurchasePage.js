//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreatePurchaseForm from "./forms/CreatePurchaseForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function CreatePurchasePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Purchase Page`);

const componentsToRender = [CreatePurchaseForm];
const componentsToRender2 = [CreatePurchasePage];

  return (
    <div className="page-container">
      <h1 className="title">Create Purchases</h1>
  
      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default CreatePurchasePage;