import React from "react";
import ViewsCommonMenuItem from "./menus/ViewsCommonMenuItem";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

export default function CommonPage() {
  return (
    <div className="page-container">
      <h1 className="title">Common Page</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
        <div className="menu-list-container">
            <DisplayCard title="View Common Data" color="#FFD799">
              <ViewsCommonMenuItem />
            </DisplayCard>
            <DisplayCard title="Create Common Data" color="#FFD700">
              <ViewsCommonMenuItem />
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
