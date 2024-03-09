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

import MAKEININDIA3 from "../assets/MAKEININDIA3.svg";
import DIGITALINDIA3 from "../assets/DIGITALINDIA3.svg";
import successTheme3 from "../assets/successTheme3.svg";
import SpinnerTheme3 from "../assets/SpinnerTheme3.svg";
import failureTheme3 from "../assets/failureTheme3.svg";
import PCIDSS3 from "../assets/PCIDSS3.svg";
import SECURE3 from "../assets/SECURE3.svg";
import questionIcon from "../assets/questionIcon.svg";

interface PaymentProps {
  transactionStatus?: string;
}

const ThirdPaymentStatus: React.FC<PaymentProps> = () => {
  const [paymentStatus, setPaymentStatus] = useState(" ");
  const { invoiceData } = useFirstModule();

  const handleCall = () => {
    window.open(`tel:${invoiceData?.vendor_number}`, "_self");
  };

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
    <div>
      {paymentStatus !== " " ? (
        <div className="p-6 flex flex-col gap-4">
          {paymentStatus === "SUCCESS" && (
            <Card
              sx={{
                minWidth: 275,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div>
                    <p className="font-medium text-[22px] text-[#2E313A]">
                      Payment Success
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-medium text-[22px] text-[#2E313A]">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                    <img
                      src={successTheme3}
                      width={30}
                      height={38}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-[#B5B5B5]">
                      {invoiceData?.payable_amount == "0" || "1"
                        ? " Rupee"
                        : " Rupees"}{" "}
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2 ">
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      To: XYZ agencies
                    </p>
                    <p className="font-medium text-[16px] text-[#B5B5B5]">
                      UPI ID: ab74hhfjf999@ybl
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      From: David Miller
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      State Bank Of India - 9988
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      UPI Ref ID: 34678789999
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      Jan 5, 2024, 03:00pm
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
              }}
            >
              <CardContent>
                <div className="flex flex-col gap-2 justify-center items-center ">
                  <div>
                    <img
                      src={SpinnerTheme3}
                      width={80}
                      height={80}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[22px] text-black">
                      Processing Payment
                    </p>
                  </div>
                  <div className="flex gap-1 ">
                    <p className="font-medium text-[22px] text-black">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-[#B5B5B5]">
                      {invoiceData?.payable_amount == "0" || "1"
                        ? " Rupee"
                        : " Rupees"}{" "}
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2 ">
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      To: XYZ agencies
                    </p>
                    <p className="font-medium text-[16px] text-[#B5B5B5]">
                      UPI ID: ab74hhfjf999@ybl
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      From: David Miller
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      State Bank Of India - 9988
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      UPI Ref ID: 34678789999
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      Jan 5, 2024, 03:00pm
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
              }}
            >
              <CardContent>
                <div className="flex flex-col gap-3 justify-center items-center">
                  <div>
                    <p className="font-medium text-[22px] text-black">
                      Transaction Failed
                    </p>
                  </div>
                  <div className="flex gap-1 items-center justify-center">
                    <p className="font-medium text-[22px] text-black">
                      ₹ {invoiceData?.payable_amount}
                    </p>
                    <img
                      src={failureTheme3}
                      width={30}
                      height={38}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[12px] text-[#B5B5B5]">
                      {invoiceData?.payable_amount == "0" || "1"
                        ? " Rupee"
                        : " Rupees"}{" "}
                      {invoiceData?.payable_amount &&
                        numberToWords(
                          Math.floor(Number(invoiceData?.payable_amount))
                        )}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex flex-col gap-2">
                    <p className="font-medium text-[14px]">
                      There is a technical issue at your bank. Please try after
                      some time.
                    </p>
                    <p className="font-medium text-[14px]">
                      <b>Note:</b> If money has been debited from your account,
                      it will be refunded within 3 to 5 days.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4 ">
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      To: XYZ agencies
                    </p>
                    <p className="font-medium text-[16px] text-[#B5B5B5]">
                      UPI ID: ab74hhfjf999@ybl
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      From: David Miller
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      State Bank Of India - 9988
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[16px] text-[#2E313A]">
                      UPI Ref ID: 34678789999
                    </p>
                    <p className="font-medium text-[16px]  text-[#B5B5B5]">
                      Jan 5, 2024, 03:00pm
                    </p>
                  </div>
                </div>

                <div
                  className="flex gap-4 justify-center items-center p-2 border-2 border-[##7F81FA] rounded-md"
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
          )}
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

export default ThirdPaymentStatus;
