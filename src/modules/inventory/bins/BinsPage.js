import React from "react";
import BinsMenu from "./menus/BinsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function BinsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Bins are rendering.`);

  return (
    <DisplayCard title="Bins" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <BinsMenu />
        </div>
      </div>
    </DisplayCard>
  );
}