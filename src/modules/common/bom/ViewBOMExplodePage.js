import React, { useState } from "react";
//import ExplodeBOMContainer from "./ExplodeBOMContainer";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import ViewExplodeBOMForm from "./forms/ViewExplodeBOMForm";
import ViewBOMResultsPage from "./extras/ViewBOMResultsPage";
import ViewBOMResultsPageNone from "./extras/ViewBOMResultsPageNone";
import "../../utilities/css/appcss.css";

function ViewBOMExplodePage() {
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
