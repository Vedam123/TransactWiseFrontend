import React, { useEffect } from "react";

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

export default function ViewBOMResultsPageNone() {
  useEffect(() => {
    const logMount = () => {
      logger.info(`[${new Date().toLocaleTimeString()}] DocumentationContainer component mounted.`);
    };
    const logUnmount = () => {
      logger.info(`[${new Date().toLocaleTimeString()}] DocumentationContainer component unmounted.`);
    };

    logMount(); // Log component mount
    return () => {
      logUnmount(); // Log component unmount
    };
  }, []);

  return (
    <div className="child-container empty-container">
      <div className="empty-text">
        No data is there to display
      </div>
    </div>
  );
}
