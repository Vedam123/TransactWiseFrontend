import React from "react";

import ViewCurrenciesMenu from "./menus/ViewCurrenciesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function CurrenciesPage() {

  return (
    <DisplayCard title="Currencies" color="#FFD799">
      <ViewCurrenciesMenu />
    </DisplayCard>
  );
}
