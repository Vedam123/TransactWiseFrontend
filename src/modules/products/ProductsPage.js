import React from "react";
//import DataManipulationMenu from "../menu/products/DataManipulationMenu";
//import DataRetrievalMenu from "../menu/products/DataRetrievalMenu";
import CreateProductMenuItem from "./menus/CreateProductMenuItem";
import DeleteProductMenuItem from "./menus/DeleteProductMenuItem";
import UpdateProductMenuItem from "./menus/UpdateProductMenuItem";
import ViewAllProductsMenuItem from "./menus/ViewAllProductsMenuItem";
import ViewProdCatMenuItem from "./menus/ViewProdCatMenuItem";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

export default function ProductsPage() {
  return (
    <div className="page-container">
      <h1 className="title">Product & Product Categories</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            <DisplayCard title="Products" color="#FFD799">
              <div className="child-container form-container">
                <div className="menu-list">
                  <CreateProductMenuItem />
                  <DeleteProductMenuItem />
                  <UpdateProductMenuItem />
                  <ViewAllProductsMenuItem />
                </div>
              </div>
            </DisplayCard>
            <DisplayCard title="Product Categories" color="#FFD799">
              <div className="child-container form-container">
                <div className="menu-list">
                  <ViewProdCatMenuItem />
                </div>
              </div>
            </DisplayCard>
          </div>
        </div>
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
