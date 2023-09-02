import React from "react";
import PurchaseMenu from "./menus/PurchaseMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

export default function PurchasePage() {
  return (
    <div className="page-container">
      <h1 className="title">Purchase Module</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <h2 className="title">Menu</h2>
          <div className="menu-list-container">
          <DisplayCard title="Purchase Reqs" color="#FFD799">
            <PurchaseMenu group="Req" />
          </DisplayCard>

          <DisplayCard title="RFQs" color="#FFD799">
            <PurchaseMenu group="RFQ" />
          </DisplayCard>

          <DisplayCard title="POs" color="#FFD799">
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
