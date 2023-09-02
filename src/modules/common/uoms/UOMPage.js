import React from "react";

import UOMMenu from "./menus/UOMMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

export default function UOMPage() {

  return (
    <DisplayCard title="UOM" color="#FFD799">
      <UOMMenu />
    </DisplayCard>
  );
}
