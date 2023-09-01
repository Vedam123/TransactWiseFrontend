import React from "react";
import "../utilities/css/appcss.css";
//import CommonPageMenu from "./menus/CommonPageMenu";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UOMPage from "./uoms/UOMPage";
import TaxCodesPage from "./taxcodes/TaxCodesPage";
import ExchangeRatesPage from "./exchangerates/ExchangeRatesPage";
import CurrenciesPage from "./currencies/CurrenciesPage";
import BOMPage from "./bom/BOMPage"
import BusinessPartnersPage from "./businesspartner/BusinessPartnersPage"
//import DisplayCard from "../utilities/DisplayCard";

export default function CommonPage() {
  return (
    <div className="page-container">
    <h1 className="title">Common Functions</h1>
    <div className="parent-container">
      <div className="child-container menu-container">
        <div className="menu-list-container">
        <UOMPage />
        <TaxCodesPage />
        <ExchangeRatesPage />
        <CurrenciesPage />
        <BOMPage />
        </div>
        <div className="menu-list-container">
        <BusinessPartnersPage />
        </div>
      </div>
      <DocumentationContainer />
    </div>
    <RotatingImage />
    <BottomContainer />
  </div>
  );
}
