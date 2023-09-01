import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import ViewProdCatMenu from "./menus/ViewProdCatMenu";
import CreateProdCatMenu from "./menus/CreateProdCatMenu";
import DeleteProdCatMenu from "./menus/DeleteProdCatMenu";
import UpdateProdCatMenu from "./menus/UpdateProdCatMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";

export default function ProductCategoriesPage() {
  //alert("Entered Employee Page");
  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
    ModulePermissions({
      moduleName: "common", // Provide the appropriate module name
    });

  return (

    <DisplayCard title="Product Categories" color="#FFD799">
    <div className="child-container form-container">
      <div className="menu-list">
        {canViewModule && <ViewProdCatMenu />}
        {canCreateModule && <CreateProdCatMenu />}
        {canDeleteModule && <DeleteProdCatMenu />}
        {canUpdateModule && <UpdateProdCatMenu />}
      </div>
      </div>
    </DisplayCard>

  );
}
