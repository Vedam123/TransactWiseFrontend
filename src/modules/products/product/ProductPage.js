import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import CreateProductMenuItem from "./menus/CreateProductMenuItem";
import DeleteProductMenuItem from "./menus/DeleteProductMenuItem";
import UpdateProductMenuItem from "./menus/UpdateProductMenuItem";
import ViewAllProductsMenuItem from "./menus/ViewAllProductsMenuItem";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function ProductPage() {
  //alert("Entered Employee Page");
  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
    ModulePermissions({
      moduleName: "common", // Provide the appropriate module name
    });

  return (
    <DisplayCard title="Products" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          {canViewModule && <ViewAllProductsMenuItem />}
          {canCreateModule && <CreateProductMenuItem />}
          {canDeleteModule && <DeleteProductMenuItem />}
          {canUpdateModule && <UpdateProductMenuItem />}
        </div>
      </div>
    </DisplayCard>
  );
}
