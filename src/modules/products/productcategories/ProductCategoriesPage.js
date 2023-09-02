import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import ProductsCatMenu from "./menus/ProductsCatMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function ProductCategoriesPage() {
  return (
    <DisplayCard title="Product Categories" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <ProductsCatMenu />
        </div>
      </div>
    </DisplayCard>
  );
}
