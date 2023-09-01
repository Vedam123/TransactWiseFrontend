import React from "react";

import ViewTaxCodesMenu from "./menus/ViewTaxCodesMenu";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function TaxCodesPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <DisplayCard title="Tax Code functions" color="#FFD799">
      <div className="menu-list">{canViewModule && <ViewTaxCodesMenu />}</div>
    </DisplayCard>
  );
}
