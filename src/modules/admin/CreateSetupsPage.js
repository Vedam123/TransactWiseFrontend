import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import CreateSetupsForm from "./forms/CreateSetupsForm";

export default function CreateSetupsPage() {
  return (
    <div className="page-container">
      <h1 className="title">Find & Create Configurations</h1>

      <div className="parent-container">
        <CreateSetupsForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}
