import React from "react";
import EmployeeMenuItem from "./menus/EmployeeMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";
import logger from "../utilities/Logs/logger"; // Import your logger

export default function EmployeePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading EmployeePage.`); // Info log message

  return (
    <div className="page-container">
      <h1 className="title">Employee</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="View Employee Data" color="#FFD799">
            <div className="child-container form-container">
              <div className="menu-list">
                <EmployeeMenuItem />
              </div>
            </div>
          </DisplayCard>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
