import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UOMPage from "./uoms/UOMPage";
import TaxCodesPage from "./taxcodes/TaxCodesPage";
import ExchangeRatesPage from "./exchangerates/ExchangeRatesPage";
import CurrenciesPage from "./currencies/CurrenciesPage";
import BOMPage from "./bom/BOMPage";
import BusinessPartnersPage from "./businesspartner/BusinessPartnersPage";
import LegalEntityPage from "./legalentity/LegalEntityPage";
import logger from "../utilities/Logs/logger";

export default function CommonPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] CommonPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [
    BusinessPartnersPage,
    UOMPage,
    TaxCodesPage,
    ExchangeRatesPage,
    CurrenciesPage,
    BOMPage,
    LegalEntityPage
  ];

  const componentsToRender2 = [CommonPage]

  return (
    <div className="page-container">
      {/* Log the page title with timestamp */}
      <h1 className="title">Common Functions</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            {componentsToRender.map((Component, index) => (
              <Component key={index} />
            ))}
          </div>
        </div>
        <DocumentationContainer  componentNames={componentsToRender2.map(component => component.name)} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
