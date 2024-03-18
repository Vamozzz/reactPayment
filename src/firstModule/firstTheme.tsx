import React, { FC, useState } from "react";
import AmountPayable from "../firstModule/amountPayable";
import BrandSpace from "../firstModule/brandSpace";
import SelectPayment from "../firstModule/selectPayment";
import PaymentType from "../firstModule/paymentType";
import DetailsPuller from "../firstModule/puller";
import Queries from "../firstModule/contact";
import FooterLink from "../firstModule/footerLink";
import Payment from "../firstModule/payment";
import Pcidss3 from "../assets/PCIDSSnew.svg";
import secured from "../assets/SECUREnew.svg";
import makeinindia from "../assets/MAKEININDIAnew12.svg";
import digitalindia from "../assets/DIGITALINDIAnew.svg";
import yesbank from "../assets/yesbanknew12.svg";

interface module {
  payableAmount: string;
  setPayableAmount: React.Dispatch<React.SetStateAction<string>>;
}

const FirstTheme: FC<module> = ({ payableAmount, setPayableAmount }) => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full h-full flex flex-col gap-4 border-2">
      <BrandSpace />
      {!isSubmitted ? (
        <div className="px-8 ">
          <AmountPayable
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
          <div className="my-4">
            <p>Select payment options</p>
          </div>
          {/* <SelectPayment /> */}
          <PaymentType />
          <Queries />
          <div className="my-4">
            <FooterLink />
          </div>
          <div className="flex flex-col items-center gap-5 pb-10  text-[#ABABAB]">
            <div className="flex gap-1 font-medium text-[14px] justify-center items-center">
              <p>In partnership with </p>
              <img src={yesbank} alt="UPI Logo" height={40} width={60} />
            </div>

            <div className="flex items-center justify-around w-full ">
              <div>
                <img src={Pcidss3} width={120} height={70} alt="logo" />
              </div>

              <div>
                <img src={secured} width={120} height={70} alt="logo" />
              </div>

              <div>
                <img src={makeinindia} width={120} height={70} alt="logo" />
              </div>
              <div>
                <img src={digitalindia} width={120} height={70} alt="logo" />
              </div>
            </div>
            <p className="font-medium text-[14px]">your money is always safe</p>
          </div>
          <DetailsPuller
            submitted={isSubmitted}
            setSubmitted={setSubmitted}
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
        </div>
      ) : (
        <Payment
        //  transactionStatus={paymentStatus}
        />
      )}
    </div>
  );
};

export default FirstTheme;
