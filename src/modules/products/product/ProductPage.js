import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import ProductsMenu from "./menus/ProductsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function ProductPage() {



  return (
    <DisplayCard title="Products" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
            <ProductsMenu />
        </div>
      </div>
    </DisplayCard>
  );
}
