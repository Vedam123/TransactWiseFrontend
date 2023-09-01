import React from "react";
import "../utilities/css/appcss.css";
import CommonPageMenu from "./menus/CommonPageMenu";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

export default function CommonPage() {
  return (
    <div className="page-container">
      <h1 className="title">Common Items</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Functions" color="#FFD799">
          <CommonPageMenu />
          </DisplayCard >
        </div>
        <DocumentationContainer />
      </div>
      <BottomContainer />
      <RotatingImage />
    </div>
  );
}
