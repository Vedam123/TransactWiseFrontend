import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import CreateEmployeeForm from "./forms/CreateEmployeeForm";

function CreateEmployeePage() {
  return (
    <div className="page-container">
      <h1 className="title">Create Employee</h1>

      <div className="parent-container">
        <CreateEmployeeForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default CreateEmployeePage;
