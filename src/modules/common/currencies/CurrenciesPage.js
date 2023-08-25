import React from "react";

import ViewCurrenciesMenu from "./menus/ViewCurrenciesMenu";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function CurrenciesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <div className="page-container">
      <h1 className="title">Currencies</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Currency Functions" color="#FFD799">
            <div className="menu-list">
              {canViewModule && <ViewCurrenciesMenu />}
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
