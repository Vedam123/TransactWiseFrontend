//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchDefaultTaxCodesForm from "./forms/SearchDefaultTaxCodesForm";

function SearchDefaultTaxCodesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search SearchDefaultTaxCodesPage`);

const componentsToRender = [SearchDefaultTaxCodesForm];
const componentsToRender2 = [SearchDefaultTaxCodesPage];

  return (
    <div className="page-container">
      <h1 className="title">Search Company Default Tax Codes </h1>
  
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

export default SearchDefaultTaxCodesPage;