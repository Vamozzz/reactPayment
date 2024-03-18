import React, { FC } from "react";
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
import AmountPayable from "./amountPayable";
import yesbank from "../assets/yesbanknew12.svg"

interface module {
  payableAmount: string;
  setPayableAmount: React.Dispatch<React.SetStateAction<string>>;
}

const SecondTheme: FC<module> = ({ payableAmount, setPayableAmount }) => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full border-2">
      <SecondBrandSpace />
      {!isSubmitted ? (
        <div className="p-4 pb-[180px] flex flex-col gap-3">
          <AmountPayable
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
          <p className="font-semibold text-[22px]">Select Payment Options</p>
          <SecondPaymentType />
          {/* <SelectPayment /> */}
          <Queries />
          <FooterLink />
          {/* <div className="flex flex-col items-center gap-5 pb-1">
            <div className="text-[#ABABAB]">
              <p>your money is always safe</p>
            </div>

            <div className="flex items-center justify-around w-full ">
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
          </div> */}
          <div className="flex flex-col items-center gap-5  text-[#ABABAB]">
            <div className="flex gap-1 font-medium text-[14px] justify-center items-center">
             
              <p>In partnership with </p>
              <img src={yesbank} alt="UPI Logo" height={40} width={60} />

            </div>

            <div className="flex items-center justify-around w-full ">
              <div>
                <img src={pcid} width={120} height={70} alt="logo" />
              </div>

              <div>
                <img src={secure} width={120} height={70} alt="logo" />
              </div>

              <div>
                <img src={MAKEININDIA3} width={120} height={70} alt="logo" />
              </div>
              <div>
                <img src={DIGITALINDIA3} width={120} height={70} alt="logo" />
              </div>
            </div>
             <p className="font-medium text-[14px]">your money is always safe</p>
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
