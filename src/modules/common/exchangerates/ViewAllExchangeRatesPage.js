import React from "react";
import ViewAllExchangeRatesForm from "./forms/ViewAllExchangeRatesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewAllExchangeRatesPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Currencies</h1>
      
        <ViewAllExchangeRatesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllExchangeRatesPage;
