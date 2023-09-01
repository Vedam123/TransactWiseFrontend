import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import ProductPage from "./product/ProductPage";
import ProductCategoriesPage from "./productcategories/ProductCategoriesPage";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
//import DisplayCard from "../utilities/DisplayCard";

export default function ProductsPage() {
  return (
    <div className="page-container">
      <h1 className="title">Product & Product Categories</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            <ProductPage />
            <ProductCategoriesPage />    
          </div>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
