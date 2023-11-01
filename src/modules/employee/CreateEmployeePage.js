import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import CreateEmployeeForm from "./forms/CreateEmployeeForm";
import logger from "../utilities/Logs/logger";

function CreateEmployeePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading CreateEmployeePage.`); // Info log message

  // Define the list of components to render
  const componentsToRender = [CreateEmployeeForm];
  const componentsToRender2 = [CreateEmployeePage];

  return (
    <div className="page-container">
      <h1 className="title">Create Employee</h1>

      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <Component key={index} />
        ))}
        <DocumentationContainer componentNames={componentsToRender2.map((component) => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default CreateEmployeePage;
