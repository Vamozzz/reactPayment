import Queries from "../firstModule/contact";
import FooterLink from "../firstModule/footerLink";
import PaymentFailed from "../firstModule/paymentFailed";
import PaymentStatus from "../firstModule/paymentStatus";
import PaymentSuccess from "../firstModule/paymentSuccessful";
import { useFirstModule } from "../provider/invoiceProvider";
import React, { useEffect, useRef, useState } from "react";
import WaitPage from "./waitPage";
import { Card, CardContent } from "@mui/material";
import numberToWords from "../utils/numToWord";

import paymentSuccessIcon from "../assets/successStatusIcon.svg";
import paymentFailedIcon from "../assets/failedStatusIcon.svg";
import spinnerIcon from "../assets/Spinner.svg";
import questionIcon from "../assets/questionIcon.svg";

import pciDssIcon from "../assets/PCIDSS3.svg";
import secureIcon from "../assets/SECURE3.svg";
import makeInIndiaIcon from "../assets/MAKEININDIAnew12.svg";
import digitalIndiaIcon from "../assets/DIGITALINDIA3.svg";

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

const SecondPaymentStatus: React.FC<PaymentProps> = () => {
  const [paymentStatus, setPaymentStatus] = useState<string>(" ");
  const { invoiceData } = useFirstModule();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    txn_amount: "",
    txn_status: "",
    txn_orderid: "",
    txn_txnid: "",
    txn_time: "",
  });

  const handleCall = () => {
    window.open(`tel:${invoiceData?.vendor_number}`, "_self");
  };

  // useEffect(() => {
  //   const fetchTransactionStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.vampay.in/Merchent/InvoiceTransactionWebhook",
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             invoice_id: invoiceData?.invoiceId,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("API request failed");
  //       }

  //       const data = await response.json();
  //       setPaymentStatus(data?.data);
  //     } catch (error) {
  //       setPaymentStatus("FAILURE");
  //     }
  //   };
  //   const intervalId = setInterval(async () => {
  //     if (paymentStatus === " " || paymentStatus === "PENDING") {
  //       // console.log("1===", paymentStatus, "========>");
  //       await fetchTransactionStatus();
  //     } else if (paymentStatus === "FAILURE" || paymentStatus === "SUCCESS") {
  //       // console.log("2===", paymentStatus, "========>");
  //       clearInterval(intervalId);
  //     }
  //   }, 3000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [invoiceData?.invoiceId, paymentStatus]);

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
        console.log(data?.data);
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
    <div>
      {paymentStatus !== " " ? (
        <div className="flex flex-col gap-4 p-6">
          {paymentStatus === "SUCCESS" && (
            <Card
              sx={{
                minWidth: 275,
                borderRadius: 4,
                backgroundColor: "#22C178",
              }}
            >
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div>
                    <p className="font-medium text-[22px] text-white">
                      Payment Success
                    </p>
                    <p>{paymentData?.txn_time}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-medium text-[22px] text-white">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                    <img
                      src={paymentSuccessIcon}
                      width={30}
                      height={38}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-white">
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                      {invoiceData?.payable_amount == "0" || "1"
                        ? " Rupee"
                        : " Rupees"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {paymentStatus === "PENDING" && (
            <Card
              sx={{
                minWidth: 275,
                borderRadius: 4,
                backgroundColor: "#FF9920",
              }}
            >
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div>
                    <img src={spinnerIcon} width={80} height={38} alt="logo" />
                  </div>
                  <div>
                    <p className="font-medium text-[22px] text-white">
                      Processing Payment
                    </p>
                    <p>{paymentData?.txn_time}</p>
                  </div>
                  <div className="flex gap-1 ">
                    <p className="font-medium text-[22px] text-white">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-white">
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                      {invoiceData?.payable_amount == "0" || "1"
                        ? " Rupee"
                        : " Rupees"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {paymentStatus === "FAILURE" && (
            <Card
              sx={{
                minWidth: 275,
                borderRadius: 4,
                backgroundColor: "#FF522D",
              }}
            >
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div>
                    <p className="font-medium text-[22px] text-white">
                      Transaction Failed
                    </p>
                    <p>{paymentData?.txn_time}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <p className="font-medium text-[22px] text-white">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                    <img
                      src={paymentFailedIcon}
                      width={30}
                      height={38}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-white">
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                      {invoiceData?.payable_amount === "0" || "1"
                        ? " Rupee"
                        : " Rupees"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl">
                    <p className="font-medium text-[14px]">
                      There is a technical issue at your bank. Please try after
                      some time.
                    </p>
                    <p className="font-medium text-[14px]">
                      <b>Note:</b> If money has been debited from your account,
                      it will be refunded within 3 to 5 days.
                    </p>
                  </div>
                  <Card
                    sx={{ minWidth: 275, borderRadius: 4 }}
                    className="w-full"
                  >
                    <CardContent>
                      <div
                        className="flex items-center justify-center gap-4"
                        onClick={handleCall}
                      >
                        <img
                          src={questionIcon}
                          alt="logo"
                          height={25}
                          width={25}
                          className=""
                        />
                        <p>Contact Vampay Support</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
          <Card sx={{ minWidth: 275, borderRadius: 4 }}>
            <CardContent>
              <div className="flex flex-col gap-2 p-2 ">
                <div>
                  <p className="font-medium text-[16px]">
                    To: {invoiceData?.vendor_name}
                  </p>
                  <p className="font-medium text-[16px] text-[#B5B5B5]">
                    {invoiceData?.transaction_id}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[16px]">From: David Miller</p>
                  <p className="font-medium text-[16px] text-[#B5B5B5]">
                    State Bank Of India - 9988
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[16px]">
                    UPI Ref ID: 34678789999
                  </p>
                  <p className="font-medium text-[16px] text-[#B5B5B5]">
                    Jan 5, 2024, 03:00pm
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Queries />
          <FooterLink />
          <div className="flex flex-col items-center gap-5 pb-36">
            <div>
              <p>your money is always safe</p>
            </div>

            <div className="flex items-center justify-around w-full ">
              <div>
                <img src={pciDssIcon} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={secureIcon} width={80} height={38} alt="logo" />
              </div>

              <div>
                <img src={makeInIndiaIcon} width={80} height={38} alt="logo" />
              </div>
              <div>
                <img src={digitalIndiaIcon} width={80} height={38} alt="logo" />
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

export default SecondPaymentStatus;
