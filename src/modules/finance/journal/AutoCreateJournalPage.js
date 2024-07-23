//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import AutoCreateJournalForm from "./forms/AutoCreateJournalForm";
//import "../../utilities/css/appcss.css";
//import JournalResultsForm from "./forms/JournalResultsForm";

function AutoCreateJournalPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Auto Create Journal`);

const componentsToRender = [AutoCreateJournalForm];
const componentsToRender2 = [AutoCreateJournalPage];

  return (
    <div className="page-container">
      <h1 className="title">Auto Create Journals</h1>
  
      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default AutoCreateJournalPage;