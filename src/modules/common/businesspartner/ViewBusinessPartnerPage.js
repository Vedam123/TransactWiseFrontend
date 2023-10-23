import React from "react";
import ViewBusinessPartnerForm from "./forms/PartnerResults";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function ViewBusinessPartnerPage() {
  // Log a message with the current time when entering the ViewBusinessPartnerPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered ViewBusinessPartnerPage`);

  return (
    <div className="page-container">
      <h1 className="title">List of Business Partners</h1>
      <ViewBusinessPartnerForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewBusinessPartnerPage;
