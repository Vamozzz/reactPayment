import React from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import vampayIcon from "../assets/vampay.svg"

const SecondBrandSpace = () => {
  const { invoiceData } = useFirstModule();

  return (
    <div
      className={`sticky p-10 top-0 max-h-[200px] overflow-hidden rounded-b-2xl ${
        invoiceData?.bg_color ? `bg-[${invoiceData?.bg_color}]` : "bg-white"
      } z-10 w-full flex justify-center items-center`}
    >
      <img
        src={invoiceData?.merchant_logo || vampayIcon}
        alt={"logo"}
        height={"100"}
        width={"100"}
        className=""
      />
    </div>
  );
};

export default SecondBrandSpace;
