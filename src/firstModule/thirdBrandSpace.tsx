import React from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import icon from "../assets/vampayIcon.svg";

export default function ThirdBrandSpace() {
  const { invoiceData } = useFirstModule();
  return (
    <div className="w-full  sticky top-0 z-10 p-4  flex justify-center items-center bg-[#E5E5E5] ">
      <div
        className={`w-full flex justify-center items-center p-4 rounded-2xl ${
          invoiceData?.bg_color ? `bg-[${invoiceData?.bg_color}]` : "bg-white"
        } `}
      >
        <img
          src={invoiceData?.merchant_logo || icon}
          alt="merchant logo"
          height={"100%"}
          width={"100%"}
          className="object-none "
        />
      </div>
    </div>
  );
}
