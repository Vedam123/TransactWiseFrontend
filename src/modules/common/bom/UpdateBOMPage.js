//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; 
import UpdateModelBOM from "./forms/UpdateModelBOM";

export default function UpdateBOMPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering UpdateBOMPage`);

  // Extracting parameters from the URL
  const { BOMParameters } = useParams();

  const componentsToRender2 = [UpdateBOMPage]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Update BOM</h1>
  
      <div className="parent-container">
        <UpdateModelBOM BOMParameters={BOMParameters} />
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
