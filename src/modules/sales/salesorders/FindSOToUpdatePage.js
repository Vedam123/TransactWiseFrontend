//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindSOToUpdateForm from "./forms/FindSOToUpdateForm";
//import SalesResultsForm from "./forms/SalesResultsForm";

function FindSOToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Order Page`);

const componentsToRender = [FindSOToUpdateForm];
const componentsToRender2 = [FindSOToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find Sales order to Update </h1>
  
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

export default FindSOToUpdatePage;