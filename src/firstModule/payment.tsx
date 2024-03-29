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
import MAKEININDIA3 from "../assets/MAKEININDIAnew12.svg";
import DIGITALINDIA3 from "../assets/DIGITALINDIA3.svg";
import yesbank from "../assets/yesbanknew12.svg"

interface PaymentProps {
  transactionStatus?: string;
}

interface PaymentData {
  txn_amount: string;
  txn_status: string;
  txn_orderid: string;
  txn_txnid: string;
  txn_time: string;
}

const Payment: React.FC<PaymentProps> = () => {
  const [paymentStatus, setPaymentStatus] = useState(" ");
  const { invoiceData } = useFirstModule();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    txn_amount: "",
    txn_status: "",
    txn_orderid: "",
    txn_txnid: "",
    txn_time: "",
  });

  useEffect(() => {
    let apiCallCount = 0;
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
        setPaymentData(data?.all_data);
        // console.log(data?.data);
      } catch (error) {
        console.log(error);
        if (apiCallCount > 5) {
          setPaymentStatus("FAILURE");
        } else {
          apiCallCount++;
        }
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
        <div className="flex flex-col gap-4 px-8 py-2">
          {paymentStatus === "PENDING" ? (
            <PaymentStatus paymentData={paymentData} />
          ) : paymentStatus === "SUCCESS" ? (
            <PaymentSuccess paymentData={paymentData} />
          ) : paymentStatus === "FAILURE" ? (
            <PaymentFailed paymentData={paymentData} />
          ) : (
            <PaymentStatus paymentData={paymentData} />
          )}
           
          <Queries />
          <FooterLink />
          <div className="flex flex-col items-center gap-5 pb-10  text-[#ABABAB]">
            <div className="flex gap-1 font-medium text-[14px] justify-center items-center">
              <p>In partnership with </p>
              <img src={yesbank} alt="UPI Logo" height={40} width={60} />
            </div>

            <div className="flex items-center justify-around w-full ">
              <div>
                <img src={PCIDSS3} width={120} height={70} alt="logo" />
              </div>

              <div>
                <img src={SECURE3} width={120} height={70} alt="logo" />
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
        <div>
          <WaitPage />
        </div>
      )}
    </div>
  );
};

export default Payment;
