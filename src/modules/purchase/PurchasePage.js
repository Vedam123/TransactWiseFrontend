import React from "react";
import PurchaseMenu from "./menus/PurchaseMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";
import logger from "../utilities/Logs/logger"; // Import your logger module here

export default function PurchasePage() {
  // Log the rendering of the PurchasePage component with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] PurchasePage component is rendering`);

  return (
    <div className="page-container">
      <h1 className="title">Purchase Module</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <h2 className="title">Menu</h2>
          <div className="menu-list-container">
            {/* DisplayCard for Purchase Reqs */}
            <DisplayCard title="Purchase Reqs" color="#FFD799">
              {/* PurchaseMenu for Purchase Reqs */}
              <PurchaseMenu group="Req" />
            </DisplayCard>

            {/* DisplayCard for RFQs */}
            <DisplayCard title="RFQs" color="#FFD799">
              {/* PurchaseMenu for RFQs */}
              <PurchaseMenu group="RFQ" />
            </DisplayCard>

            {/* DisplayCard for POs */}
            <DisplayCard title="POs" color="#FFD799">
              {/* PurchaseMenu for POs */}
              <PurchaseMenu group="PO" />
            </DisplayCard>
          </div>
        </div>
        <DocumentationContainer />
      </div>

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
