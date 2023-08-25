import React from "react";
import ViewAllUOMsForm from "./forms/ViewAllUOMsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewAllUOMsPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Products</h1>
      
          <ViewAllUOMsForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllUOMsPage;
