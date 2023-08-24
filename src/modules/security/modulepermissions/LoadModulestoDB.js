import React from "react";
import LoadModulestoDBForm from "./forms/LoadModulestoDBForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

function LoadModulestoDB() {
  return (
    <div className="page-container">
    
      <LoadModulestoDBForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default LoadModulestoDB;