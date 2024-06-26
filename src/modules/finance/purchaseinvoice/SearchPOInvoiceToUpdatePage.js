//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchPOInvoiceToUpdateForm from "./forms/SearchPOInvoiceToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchPOInvoiceToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Invoice Page`);

const componentsToRender = [SearchPOInvoiceToUpdateForm];
const componentsToRender2 = [SearchPOInvoiceToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find PO Invoice to Update </h1>
  
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

export default SearchPOInvoiceToUpdatePage;