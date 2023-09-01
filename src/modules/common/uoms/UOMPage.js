import React from "react";

import UOMMenu from "./menus/UOMMenu";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import DisplayCard from "../../utilities/DisplayCard";

export default function UOMPage() {
  //alert("Entered Employee Page");
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule } = ModulePermissions({
    moduleName: "common", // Provide the appropriate module name
  });

  return (
    <DisplayCard title="UOM" color="#FFD799">
      {canViewModule && <UOMMenu />}
    </DisplayCard>
  );
}
