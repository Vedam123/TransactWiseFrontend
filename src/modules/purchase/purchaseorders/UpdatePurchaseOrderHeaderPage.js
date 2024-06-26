//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import UpdatePOHeaderForm from "./forms/UpdatePOHeaderForm";

export default function UpdatePurchaseOrderHeaderPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Purchase Page`);

  // Extracting parameters from the URL
  const { POParameters } = useParams();

  const componentsToRender2 = [UpdatePurchaseOrderHeaderPage]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Update Purchase Orders</h1>
  
      <div className="parent-container">
        {/* Render UpdatePOInvoiceHeaderForm component directly */}
        <UpdatePOHeaderForm POParameters={POParameters} /> 
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
