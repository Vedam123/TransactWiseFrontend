//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreateSalesForm from "./forms/CreateSalesForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function CreateSalesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Purchase Page`);

const componentsToRender = [CreateSalesForm];
const componentsToRender2 = [CreateSalesPage];

  return (
    <div className="page-container">
      <h1 className="title">Create Sales</h1>
  
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

export default CreateSalesPage;