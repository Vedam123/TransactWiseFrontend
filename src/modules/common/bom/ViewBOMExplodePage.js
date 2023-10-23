import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import ViewExplodeBOMForm from "./forms/ViewExplodeBOMForm";
import ViewBOMResultsPage from "./extras/ViewBOMResultsPage";
import ViewBOMResultsPageNone from "./extras/ViewBOMResultsPageNone";
import "../../utilities/css/appcss.css";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function ViewBOMExplodePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering ViewBOMExplodePage`); // Log when the component is rendered with time

  const [explodedBOM, setExplodedBOM] = useState([]); // State to store the exploded BOM data
  return (
    <div className="page-container">
      <h1 className="title">Explode BOM</h1>
      <div className="side-by-side-container">
        <ViewExplodeBOMForm updateExplodedBOM={setExplodedBOM} />
        {explodedBOM.length > 0 ? (
          <ViewBOMResultsPage explodedBOM={explodedBOM} />
        ) : (
          <ViewBOMResultsPageNone />
        )}
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewBOMExplodePage;
