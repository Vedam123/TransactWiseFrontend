import React from "react";
import PurchaseMenu from "./menus/PurchaseMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";

export default function PurchasePage() {
   return (
    <div className="page-container">
      <h1 className="title">Purchase Module</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
        <h2 className="title">Menu</h2>
          <PurchaseMenu />
        </div>
        <DocumentationContainer />
      </div>

      <RotatingImage />
      <BottomContainer />     
    </div>
  );
}
