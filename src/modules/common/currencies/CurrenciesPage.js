import React from "react";

import ViewCurrenciesMenu from "./menus/ViewCurrenciesMenu";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function CurrenciesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <DisplayCard title="Currencies" color="#FFD799">
      <div className="menu-list">{canViewModule && <ViewCurrenciesMenu />}</div>
    </DisplayCard>
  );
}
