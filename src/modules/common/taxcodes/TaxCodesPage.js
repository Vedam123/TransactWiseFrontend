import React from "react";

import ViewTaxCodesMenu from "./menus/ViewTaxCodesMenu";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function TaxCodesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <div className="page-container">
      <h1 className="title">Tax Code </h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Tax Code functions" color="#FFD799">
            <div className="menu-list">
              {canViewModule && <ViewTaxCodesMenu />}
            </div>
          </DisplayCard>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
