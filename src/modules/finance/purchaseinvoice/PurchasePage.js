import React from "react";
import PurchaseMenu from "./menus/PurchaseMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function PurchasePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Purchase is rendering.`);

  return (
    <DisplayCard title="Purchase" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <PurchaseMenu />
        </div>
      </div>
    </DisplayCard>
  );
}