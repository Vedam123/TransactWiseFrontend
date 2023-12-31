import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import ViewExplodeBOMForm from "./forms/ViewExplodeBOMForm";
import ViewBOMResultsPage from "./extras/ViewBOMResultsPage";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger";
import "../../utilities/css/appcss.css";

function ViewBOMExplodePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering ViewBOMExplodePage`);

  const [explodedBOM, setExplodedBOM] = useState([]); // State to store the exploded BOM data

  // Define the list of components to render
  const componentsToRender = [
    <ViewExplodeBOMForm updateExplodedBOM={setExplodedBOM} />,
  ];

  const componentsToRender2 = [ViewBOMExplodePage];

  if (explodedBOM.length > 0) {
    componentsToRender.push(<ViewBOMResultsPage explodedBOM={explodedBOM} />);
  } else {
    componentsToRender.push(<DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />);
  }

  return (
    <div className="page-container">
      <h1 className="title">Explode BOM</h1>
      <div className="side-by-side-container">
        {componentsToRender.map((Component, index) => (
          <React.Fragment key={index}>{Component}</React.Fragment>
        ))}
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewBOMExplodePage;
