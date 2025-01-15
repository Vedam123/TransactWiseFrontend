//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindCompanyToUpdateForm from "./forms/FindCompanyToUpdateForm";
import "../../utilities/css/appcss.css";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindCompanyToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Company Page`);

  const componentsToRender = [FindCompanyToUpdateForm];
  const componentsToRender2 = [FindCompanyToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find Company to Update </h1>

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

export default FindCompanyToUpdatePage;