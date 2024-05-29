//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchSOInvoiceToUpdateForm from "./forms/SearchSOInvoiceToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchSOInvoiceToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Invoice Page`);

const componentsToRender = [SearchSOInvoiceToUpdateForm];
const componentsToRender2 = [SearchSOInvoiceToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find SO Invoice to Update </h1>
  
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

export default SearchSOInvoiceToUpdatePage;