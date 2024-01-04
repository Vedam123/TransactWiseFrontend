import React from "react";
import BinsPage from "./bins/BinsPage";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import logger from "../utilities/Logs/logger"; // Import your logger module here
import ReceiptsPage from "./receipts/ReceiptsPage";
import TransactionsPage from "./transactions/TransactionsPage";
//import SearchItemInventoryPage from "./transactions/SearchItemInventoryPage"

export default function InventoryPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Inventory component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [BinsPage, ReceiptsPage, TransactionsPage];

  const componentsToRender2 = [InventoryPage];

  return (
    <div className="page-container">
      <h1 className="title">Inventory Module</h1>
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
