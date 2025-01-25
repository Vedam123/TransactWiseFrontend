//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindPOToUpdateForm from "./forms/FindPOToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindPOToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Order Page`);

const componentsToRender = [FindPOToUpdateForm];
const componentsToRender2 = [FindPOToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find and Update Purchase Order</h1>
  
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

export default FindPOToUpdatePage;