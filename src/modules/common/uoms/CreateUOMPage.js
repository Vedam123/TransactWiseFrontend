import React from "react";
import CreateUOMForm from "./forms/CreateUOMForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function CreateUOMPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] CreateUOMPage component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Create Unit of Measure</h1>
      
      <CreateUOMForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default CreateUOMPage;
