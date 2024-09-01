//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchDefaultAccountsForm from "./forms/SearchDefaultAccountsForm";

function SearchDefaultAccountsPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Page`);

const componentsToRender = [SearchDefaultAccountsForm];
const componentsToRender2 = [SearchDefaultAccountsPage];

  return (
    <div className="page-container">
      <h1 className="title">Company Default Accounts Page </h1>
  
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

export default SearchDefaultAccountsPage;