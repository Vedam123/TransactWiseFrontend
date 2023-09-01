import React from "react";

import BusinessPartnerMenu from "./menus/BusinessPartnerMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function BusinessPartnersPage() {
  //alert("Entered Employee Page");
 

  return (
    <DisplayCard title="UOM" color="#FFD799">
      <BusinessPartnerMenu />
    </DisplayCard>
  );
}
