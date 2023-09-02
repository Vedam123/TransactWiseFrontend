import React from "react";

import ViewTaxCodesMenu from "./menus/ViewTaxCodesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function TaxCodesPage() {


  return (
    <DisplayCard title="Tax Code functions" color="#FFD799">
      <div className="menu-list"> <ViewTaxCodesMenu /> </div>
    </DisplayCard>
  );
}
