import React from "react";

import BOMMenu from "./menus/BOMMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function BOMPage() {

  return (
    <DisplayCard title="BOM" color="#FFD799">
      <BOMMenu />
    </DisplayCard>
  );
}
