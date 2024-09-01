//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreateDefaultTaxCodesHeadersForm from "./forms/CreateDefaultTaxCodesHeadersForm";
//import JournalResultsForm from "./forms/JournalResultsForm";

function CreateDefaultTaxCodesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering CreateDefaultTaxCodesPage`);

const componentsToRender = [CreateDefaultTaxCodesHeadersForm];
const componentsToRender2 = [CreateDefaultTaxCodesPage];

  return (
    <div className="page-container">
      <h1 className="title">Create Company Default Tax Codes</h1>
  
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

export default CreateDefaultTaxCodesPage;