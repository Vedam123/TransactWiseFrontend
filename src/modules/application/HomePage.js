import React from "react";
import "../utilities/css/appcss.css";
import HomePageMenu from "./menus/HomePageMenu";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

export default function HomePage() {
  return (
    <div className="page-container">
      <h1 className="title">TransactWise</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Modules" color="#FFD799">
          <HomePageMenu />
          </DisplayCard >
        </div>
        <DocumentationContainer />
      </div>
      <BottomContainer />
      <RotatingImage />
    </div>
  );
}
