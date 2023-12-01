import React from "react";
import AccountsPage from "./accounts/AccountsPage";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import logger from "../utilities/Logs/logger"; // Import your logger module here

export default function FinancePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Finance component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [AccountsPage];

  const componentsToRender2 = [FinancePage];

  return (
    <div className="page-container">
      <h1 className="title">Finance Module</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            {componentsToRender.map((Component, index) => (
              <Component key={index} />
            ))}
          </div>
        </div>
        <DocumentationContainer componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
