import React from "react";

import ViewExchangeRatesMenu from "./menus/ViewExchangeRatesMenu";
import "../../utilities/css/appcss.css";

import DisplayCard from "../../utilities/DisplayCard";

export default function ExchangeRatesPage() {

  return (
    <DisplayCard title="Exchange Rates" color="#FFD799">
      <div className="menu-list">
        <ViewExchangeRatesMenu />
      </div>
    </DisplayCard>
  );
}
