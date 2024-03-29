import React from "react";
import SecondBrandSpace from "./secondBrandSpace";
import SecondPuller from "./secondPuller";
import SelectPayment from "./selectPayment";
import Queries from "./contact";
import SecondPaymentType from "./secondPaymentType";
import FooterLink from "./footerLink";
import { useState } from "react";
import WaitPage from "./waitPage";
import SecondPaymentStatus from "./secondPaymentStatus";

import pcid from "../assets/PCIDSS3.svg";
import secure from "../assets/SECURE3.svg";
import MAKEININDIA3 from "../assets/MAKEININDIAnew12.svg";
import DIGITALINDIA3 from "../assets/DIGITALINDIA3.svg";

const SecondTheme = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full border-2">
      <SecondBrandSpace />
      {!isSubmitted ? (
        <div className="p-4 pb-[180px] flex flex-col gap-3">
          <p className="font-semibold text-[22px]">Select Payment Options</p>
          <SecondPaymentType />
          <SelectPayment />
          <Queries />
          <FooterLink />
          <div className="flex flex-col items-center gap-5 pb-1">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className="flex items-center justify-start w-full gap-4">
              <div>
                <img src={pcid} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={secure} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={MAKEININDIA3} width={80} height={38} alt="logo" />
              </div>
              <div>
                <img src={DIGITALINDIA3} width={80} height={38} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SecondPaymentStatus />
      )}
      {!isSubmitted && (
        <SecondPuller submitted={isSubmitted} setSubmitted={setSubmitted} />
      )}
    </div>
  );
};
export default SecondTheme;
