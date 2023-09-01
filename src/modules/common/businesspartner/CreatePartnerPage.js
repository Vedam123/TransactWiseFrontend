import React from "react";
import CreatePartnerForm from "./forms/CreatePartnerForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";

function CreatePartnerPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Business Partners</h1>

      <div className="parent-container">
        <CreatePartnerForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default CreatePartnerPage;
