import React from "react";
import ViewAllEmployeesForm from "./forms/ViewAllEmployeesForm";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";

function ViewAllEmployeesPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Employees</h1>
      <ViewAllEmployeesForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllEmployeesPage;
