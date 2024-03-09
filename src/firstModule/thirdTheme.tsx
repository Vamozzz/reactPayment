import React from "react";
import ThirdBrandSpace from "./thirdBrandSpace";
import ThirdPaymentType from "./thirdPaymentType";
import SecondPuller from "./secondPuller";
import { useState } from "react";
import SecondPaymentStatus from "./secondPaymentStatus";
import Queries from "./contact";
import SelectPayment from "./selectPayment";
import FooterLink from "./footerLink";
import ThirdPaymentStatus from "./thirdPaymentStatus";

import languageDropdownIcon from "../assets/languagedropdown.svg";
import PCIDSS3Icon from "../assets/PCIDSS3.svg";
import SECURE3Icon from "../assets/SECURE3.svg";
import MAKEININDIA3Icon from "../assets/MAKEININDIA3.svg";
import DIGITALINDIA3Icon from "../assets/DIGITALINDIA3.svg";

const ThirdTheme = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#E5E5E5] relative border-2">
      <ThirdBrandSpace />
      {!isSubmitted ? (
        <div className="relative flex flex-col gap-4 w-full h-full p-4 ">
          <div className="flex justify-between items-center p-2">
            <p className="font-semibold text-[22px]"> Select Payment Options</p>
            <img
              src={languageDropdownIcon}
              alt="merchant logo"
              height={30}
              width={30}
            />
          </div>
          <ThirdPaymentType />
          <SelectPayment />
          <Queries />
          <FooterLink />
          <div className="flex flex-col gap-5  items-center pb-48">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className=" w-full flex justify-around items-center">
              <div>
                <img src={PCIDSS3Icon} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={SECURE3Icon} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={MAKEININDIA3Icon} width={80} height={38} alt="logo" />
              </div>
              <div>
                <img
                  src={DIGITALINDIA3Icon}
                  width={80}
                  height={38}
                  alt="logo"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ThirdPaymentStatus />
      )}
      {!isSubmitted && (
        <SecondPuller submitted={isSubmitted} setSubmitted={setSubmitted} />
      )}
    </div>
  );
};

export default ThirdTheme;
