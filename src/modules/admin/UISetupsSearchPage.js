import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
//import SetupsSearchForm from "./forms/SetupsSearchForm";
import ShowAllUISetupsForm from "./forms/ShowAllUISetupsForm";

function UISetupsSearchPage() {
  return (
    <div className="page-container">
      <h1 className="title">Create React Configurations File</h1>

      <div className="parent-container">

        <ShowAllUISetupsForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default UISetupsSearchPage;