//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchJournalForm from "./forms/SearchJournalForm";
//import JournalResultsForm from "./forms/JournalResultsForm";

function SearchJournalPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Journal Page`);

const componentsToRender = [SearchJournalForm];
const componentsToRender2 = [SearchJournalPage];

  return (
    <div className="page-container">
      <h1 className="title">Journal Search Page</h1>
  
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

export default SearchJournalPage;