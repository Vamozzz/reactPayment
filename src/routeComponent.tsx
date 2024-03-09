import React from "react";
import { FirstModuleProvider } from "./provider/invoiceProvider";
import { FirstThemeProvider } from "./firstModule/page";

const RouteComponent = () => {
  return (
    <div className=" bg-[#F1F1F1] lg:w-[500px] m-auto">
      <FirstModuleProvider>
        <FirstThemeProvider />
      </FirstModuleProvider>
    </div>
  );
};

export default RouteComponent;
