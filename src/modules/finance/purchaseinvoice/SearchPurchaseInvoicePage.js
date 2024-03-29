//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchPurchaseInvoiceForm from "./forms/SearchPurchaseInvoiceForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchPurchaseInvoicePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Page`);

const componentsToRender = [SearchPurchaseInvoiceForm];
const componentsToRender2 = [SearchPurchaseInvoicePage];

  return (
    <div className="page-container">
      <h1 className="title">Purchase Invoice Page </h1>
  
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

export default SearchPurchaseInvoicePage;