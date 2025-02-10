import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import SalesOrdersSearchForm from "./forms/SalesOrdersSearchForm";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function SalesOrdersSearchPage() {
  // Log a message with the current time when entering the PartnerSearchPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered SalesOrdersSearchPage`);

  // Define the list of components to render
  const componentsToRender = [SalesOrdersSearchForm];
  const helpComponentsToRender = ["SalesOrdersSearchPage"];

  return (
    <div className="page-container">
      <h1 className="title">Search Sales Orders</h1>

      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default SalesOrdersSearchPage;
