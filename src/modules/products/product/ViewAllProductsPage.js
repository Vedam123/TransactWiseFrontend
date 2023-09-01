import React from "react";
import ViewAllProductsForm from "./forms/ViewAllProductsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewAllProductsPage() {
  return (
    <div className="page-container">
      <h1 className="title">Products</h1>
      <ViewAllProductsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllProductsPage;
