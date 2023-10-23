import React from "react";
import AdminPageMenu from "./menus/AdminPageMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

// Import your logger utility here
import logger from "../utilities/Logs/logger";

export default function AdminPage() {
  // Log an info message with the current time when the AdminPage component starts rendering
  logger.info(`[${new Date().toLocaleTimeString()}] AdminPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Admin & Setups</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Admin Functions" color="#FFD799">
            <AdminPageMenu />
          </DisplayCard>
        </div>
        <DocumentationContainer />
      </div>

      {/* Log a debug message with the current time when the RotatingImage component is rendered */}
      {RotatingImage && logger.debug(`[${new Date().toLocaleTimeString()}] RotatingImage component is rendered.`)}

      {/* Log a warning message with the current time when BottomContainer is included */}
      {BottomContainer && logger.warn(`[${new Date().toLocaleTimeString()}] BottomContainer is included.`)}
    </div>
  );
}
