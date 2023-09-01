import React from "react";

import ViewExchangeRatesMenu from "./menus/ViewExchangeRatesMenu";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function ExchangeRatesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <DisplayCard title="Exchange Rates" color="#FFD799">
      <div className="menu-list">
        {canViewModule && <ViewExchangeRatesMenu />}
      </div>
    </DisplayCard>
  );
}
