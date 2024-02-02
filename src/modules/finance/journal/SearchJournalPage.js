import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchJournalForm from "./forms/SearchJournalForm";
import JournalResultsForm from "./forms/JournalResultsForm";

function SearchJournalPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Journal Page`);

  const [foundJournals, setFoundJournals] = useState([]); // State to store the exploded BOM data

  // Define the list of components to render
  const componentsToRender = [
    <SearchJournalForm updatefoundJournals={setFoundJournals} />,
  ];

  const componentsToRender2 = [SearchJournalPage];

  if (foundJournals.length > 0) {
    componentsToRender.push(<JournalResultsForm foundJournals={foundJournals} />);
  } else {
    componentsToRender.push(<DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />);
  }

  return (
    <div className="page-container">
      <h1 className="title">Search Journals</h1>
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

export default SearchJournalPage;
