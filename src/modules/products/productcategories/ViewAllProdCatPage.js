import React from "react";
import ViewAllProdCatForm from "./forms/ViewAllProdCatForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewAllProdCatPage() {
  return (
    <div className="page-container">
      <h1 className="title">Product Categories</h1>
      <ViewAllProdCatForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllProdCatPage;
