import React, { useState } from "react";
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
import makeinindia from "../assets/MAKEININDIAnewone.svg";
import digitalindia from "../assets/DIGITALINDIAnew.svg";

const FirstTheme = () => {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <div className="relative bg-[#F1F1F1] w-full h-full flex flex-col gap-4 border-2">
      <BrandSpace />
      {!isSubmitted ? (
        <div className="px-8 ">
          <AmountPayable />
          <div className="my-4">
            <p>Select payment options</p>
          </div>
          {/* <SelectPayment /> */}
          <PaymentType />
          <Queries />
          <div className="my-4">
            <FooterLink />
          </div>
          <div className="flex flex-col items-center gap-5 pb-36 text-[#ABABAB]">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className="flex items-center justify-start w-full ">
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
          </div>
          <DetailsPuller submitted={isSubmitted} setSubmitted={setSubmitted} />
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
