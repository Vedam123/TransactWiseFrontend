import React from "react";

import ViewExchangeRatesMenu from "./menus/ViewExchangeRatesMenu";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function ExchangeRatesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <div className="page-container">
      <h1 className="title">Exchange Rates</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Exchange Rate Functions" color="#FFD799">
            <div className="menu-list">
              {canViewModule && <ViewExchangeRatesMenu />}
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
