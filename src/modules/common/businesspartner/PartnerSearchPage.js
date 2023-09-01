import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import PartnerSearchForm from "./forms/PartnerSearchForm";

function PartnerSearchPage() {
  return (
    <div className="page-container">
      <h1 className="title">Business partner Search Page</h1>

      <div className="parent-container">
        <PartnerSearchForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default PartnerSearchPage;
