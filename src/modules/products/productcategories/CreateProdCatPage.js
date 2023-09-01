import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import CreateProdCatForm from "./forms/CreateProdCatForm";

function CreateProdCatPage() {
  return (
    <div className="page-container">
      <h1 className="title">Create Product Category</h1>

      <div className="parent-container">
        <CreateProdCatForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default CreateProdCatPage;
