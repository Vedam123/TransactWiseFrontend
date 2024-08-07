//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import AutoPOInvoiceCreationForm from "./forms/AutoPOInvoiceCreationForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function AutoPOInvoiceCreationPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Auto create Purchase Invoice`);

const componentsToRender = [AutoPOInvoiceCreationForm];
const componentsToRender2 = [AutoPOInvoiceCreationPage];

  return (
    <div className="page-container">
      <h1 className="title">Auto Create PO Invoice</h1>
  
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

export default AutoPOInvoiceCreationPage;