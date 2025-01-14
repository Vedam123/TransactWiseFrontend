//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindDepartmentToUpdateForm from "./forms/FindDepartmentToUpdateForm";
import "../../utilities/css/appcss.css";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindDepartmentToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Department Page`);

  const componentsToRender = [FindDepartmentToUpdateForm];
  const componentsToRender2 = [FindDepartmentToUpdatePage];

  return (
    <div className="page-container">
      <h1 className="title">Find Department to Update </h1>

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

export default FindDepartmentToUpdatePage;