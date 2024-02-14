//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchPurchaseForm from "./forms/SearchPurchaseForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchPurchasePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Page`);

const componentsToRender = [SearchPurchaseForm];
const componentsToRender2 = [SearchPurchasePage];

  return (
    <div className="page-container">
      <h1 className="title">Purchase Search Page</h1>
  
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

export default SearchPurchasePage;