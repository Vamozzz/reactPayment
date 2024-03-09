import React from "react";
import { useFirstModule } from "../provider/invoiceProvider";

const SecondBrandSpace = () => {
  const { invoiceData } = useFirstModule();

  return (
    <div
      className={`sticky p-4 top-0 max-h-[200px] overflow-hidden rounded-b-2xl ${
        invoiceData?.bg_color ? `bg-[${invoiceData?.bg_color}]` : "bg-white"
      } z-10 w-full flex justify-center items-center`}
    >
      <img
        src={invoiceData?.merchant_logo || "/vampayIcon.svg"}
        alt={"logo"}
        height={"100%"}
        width={"100%"}
        className="object-none rounded-b-2xl"
      />
    </div>
  );
};

export default SecondBrandSpace;
