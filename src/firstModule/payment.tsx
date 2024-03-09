import Queries from "../firstModule/contact";
import FooterLink from "../firstModule/footerLink";
import PaymentFailed from "../firstModule/paymentFailed";
import PaymentStatus from "../firstModule/paymentStatus";
import PaymentSuccess from "../firstModule/paymentSuccessful";
import { useFirstModule } from "../provider/invoiceProvider";
import React, { useEffect, useRef, useState } from "react";
import WaitPage from "./waitPage";

import PCIDSS3 from "../assets/PCIDSS3.svg";
import SECURE3 from "../assets/SECURE3.svg";
import MAKEININDIA3 from "../assets/MAKEININDIA3.svg";
import DIGITALINDIA3 from "../assets/DIGITALINDIA3.svg";

interface PaymentProps {
  transactionStatus?: string;
}

const Payment: React.FC<PaymentProps> = () => {
  const [paymentStatus, setPaymentStatus] = useState(" ");
  const { invoiceData } = useFirstModule();

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      try {
        const response = await fetch(
          "https://api.vampay.in/Merchent/InvoiceTransactionWebhook",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoice_id: invoiceData?.invoiceId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setPaymentStatus(data?.data);
      } catch (error) {
        setPaymentStatus("FAILURE");
      }
    };
    const intervalId = setInterval(async () => {
      if (paymentStatus === " " || paymentStatus === "PENDING") {
        // console.log("1===", paymentStatus, "========>");
        await fetchTransactionStatus();
      } else if (paymentStatus === "FAILURE" || paymentStatus === "SUCCESS") {
        // console.log("2===", paymentStatus, "========>");
        clearInterval(intervalId);
      }
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [invoiceData?.invoiceId, paymentStatus]);

  return (
    <div className="">
      {paymentStatus !== " " ? (
        <div className="p-8 flex flex-col gap-4">
          {paymentStatus === "PENDING" ? (
            <PaymentStatus />
          ) : paymentStatus === "SUCCESS" ? (
            <PaymentSuccess />
          ) : paymentStatus === "FAILURE" ? (
            <PaymentFailed />
          ) : null}

          <Queries />
          <FooterLink />
          <div className="flex flex-col gap-5  items-center pb-36">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className=" w-full flex justify-around items-center">
              <div>
                <img src={PCIDSS3} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={SECURE3} width={80} height={38} alt="logo" />
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
        <div>
          <WaitPage />
        </div>
      )}
    </div>
  );
};

export default Payment;
