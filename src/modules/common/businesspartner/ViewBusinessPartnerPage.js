import React from "react";
import ViewBusinessPartnerForm from "./forms/PartnerResults";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function ViewBusinessPartnerPage() {
  return (
    <div className="page-container">
      <h1 className="title">List of Business Partners</h1>
      <ViewBusinessPartnerForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewBusinessPartnerPage;
