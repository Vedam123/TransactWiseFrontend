import React from "react";
import ViewAllCurrenciesForm from "./forms/ViewAllCurrenciesForm";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";

function ViewAllCurrenciesPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Currencies</h1>
      
        <ViewAllCurrenciesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllCurrenciesPage;
