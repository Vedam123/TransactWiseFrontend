import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import PartnerSearchForm from "./forms/PartnerSearchForm";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function PartnerSearchPage() {
  // Log a message with the current time when entering the PartnerSearchPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered PartnerSearchPage`);

  return (
    <div className="page-container">
      <h1 className="title">Business Partner Search Page</h1>

      <div className="parent-container">
        <PartnerSearchForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default PartnerSearchPage;
