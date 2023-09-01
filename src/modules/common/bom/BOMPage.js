import React from "react";

import BOMMenu from "./menus/BOMMenu";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function BOMPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <DisplayCard title="BOM" color="#FFD799">
      <div className="menu-list">{canViewModule && <BOMMenu />}</div>
    </DisplayCard>
  );
}
