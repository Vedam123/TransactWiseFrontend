import React from "react";
import ViewAllInspectionsForm from "./forms/ViewAllInspectionsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllInspectionsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllInspectionsForm component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Inspections</h1>
      <ViewAllInspectionsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllInspectionsPage;
