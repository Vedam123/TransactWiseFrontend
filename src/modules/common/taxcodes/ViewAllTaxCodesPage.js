import React from "react";
import ViewAllTaxCodesForm from "./forms/ViewAllTaxCodesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewAllTaxCodesPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Tax Codes</h1>
      
        <ViewAllTaxCodesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllTaxCodesPage;
