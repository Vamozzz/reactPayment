import { useFirstModule } from "../provider/invoiceProvider";
import { Card, CardContent, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useRef, useState } from "react";
import successIconSvg from "../assets/successicon.svg";
import { useFirstTheme } from "./page";
import { toBlob, toPng } from "html-to-image";
import download from "../assets/downloadnew12.svg"
import shareSvg from "../assets/sharenew12.svg";

interface successProps {
  paymentData: {
    txn_amount?: string;
    txn_status?: string;
    txn_orderid?: string;
    txn_txnid?: string;
    txn_time?: string;
    merchant_name?: string;
    merchant_email?: string;
    merchant_mobile?: string;
  };
}

const PaymentSuccess: FC<successProps> = ({ paymentData }) => {
  const { invoiceData } = useFirstModule();
  const { invoiceLink } = useFirstTheme();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const txn_time = paymentData?.txn_time;

  const htmlToImageConvert = () => {
    if (elementRef.current) {
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "Vampay_Payment.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("elementRef.current is null");
    }
  };

  const handleShare = async () => {
    if (elementRef.current) {
      const newFile = await toBlob(elementRef.current);
      if (newFile) {
        // Add a null check here
        const data = {
          files: [
            new File([newFile], "image.png", {
              type: newFile.type,
            }),
          ],
          title: "Image",
          text: " If your browser does not support Sharing, Kindly download the invoice",
        };
        try {
          if (navigator && navigator.canShare && !navigator.canShare(data)) {
            console.error("Can't share");
            alert(
              "Your browser does not support Sharing , you can download the image instead."
            );
            htmlToImageConvert();
          } else if (navigator && navigator.share) {
            await navigator.share(data);
          } else {
            console.error("Sharing not supported");
            alert(
              "Your browser does not support Sharing , you can download the image instead."
            );
            htmlToImageConvert();
          }
        } catch (err) {
          console.error(err);
          htmlToImageConvert();
        }
      } else {
        console.error("Failed to convert element to blob");
        htmlToImageConvert();
      }
    } else {
      console.error("elementRef.current is null");
      htmlToImageConvert();
    }
  };

  return (
    <div>
      <div
        className="relative flex items-start justify-center"
        ref={elementRef}
      >
        <div className=" absolute bg-[#34A853] p-3 h-16 w-16 rounded-full border-4 border-[#F1F1F1] flex justify-center items-center ">
          <img
            src={successIconSvg}
            alt="logo"
            height={100}
            width={100}
            className=""
          />
        </div>
        <div className="flex flex-col items-center gap-4 border-dashed bg-[#34A853] p-4 rounded-3xl mt-10 ">
          <div className="mt-10 text-white">
            <p className="text-center">Your transaction was successful</p>
            {txn_time && <p className="text-center">{txn_time} </p>}
          </div>

          <Card sx={{ minWidth: 275, borderRadius: 4 }}>
            <CardContent>
              <div className="flex flex-col items-start justify-around gap-4 p-2">
                <p className="text-base font-medium leading-6 text-gray-800 font-poppins ">
                  Payment request from {paymentData?.merchant_name}
                </p>
                <div>
                  <p className="text-xs font-medium leading-6 text-gray-600 uppercase font-poppins">
                    payment for
                  </p>
                  <p className="text-base font-medium leading-6 text-black capitalize font-poppins">
                    {paymentData?.merchant_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium leading-6 text-gray-600 uppercase font-poppins">
                    AMOUNT PAID
                  </p>
                  <p className="text-base font-medium leading-6 text-black capitalize font-poppins">
                    {paymentData?.txn_amount}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium leading-6 text-gray-600 uppercase font-poppins">
                    payment Id
                  </p>
                  <p className="text-base font-medium leading-6 text-black capitalize font-poppins">
                    {paymentData?.txn_orderid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <Card sx={{ minWidth: 275, borderRadius: 4 }} className="w-full">
          <CardContent>
            <div className="flex flex-col w-full gap-3 p-2">
              <div className="flex justify-between">
                <p>Name on card</p>
                <p>...0351</p>
              </div>
              <div className="flex justify-between">
                <p>Jacob Jones</p>
                <img
                  src={"/tag.svg"}
                  alt="logo"
                  height={30}
                  width={30}
                  className=""
                />
              </div>
            </div>
          </CardContent>
        </Card> */}
          {/* <Card sx={{ minWidth: 275, borderRadius: 4 }}>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={"/tag.svg"}
                alt="logo"
                height={30}
                width={30}
                className=""
              />
              <p>
                There is a technical issue at your bank. Please try after some
                time.
              </p>
              <p>
                Note: If money has been debited from your account, it will be
                refunded within 3 to 5 days.
              </p>
            </div>
          </CardContent>
        </Card> */}
          {/* <div className="w-full my-10 border-t-4 border-dashed "></div> */}
          {/* <Card sx={{ minWidth: 275, borderRadius: 4 }} className="w-full">
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <img
                src={shareSvg}
                alt="logo"
                height={25}
                width={25}
                className=""
              />
              <p>Share Reciept</p>
            </div>
          </CardContent>
        </Card> */}
        </div>
      </div>
      <div className="">
        <Card
          sx={{ minWidth: 275, borderRadius: 4,background:"#5A5CE7", boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)' }}
          className="w-full bg-[rgb(52,168,83)] mt-4 hover:bg-[#6149D3]"
        >
          <CardContent className="flex items-center justify-center ">
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-4 "
            >
              <img
                src={shareSvg}
                alt="logo"
                height={25}
                width={25}
                className=""
              />
              <p className="text-white">Share Invoice</p>
            </button>
          </CardContent>
        </Card>

        <Card
          sx={{ minWidth: 275, borderRadius: 4,background:"#5A5CE7", boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.7)' }}
          className="w-full bg-[rgb(52,168,83)] mt-4 hover:bg-[#6149D3]"
        >
          <CardContent className="flex items-center justify-center ">
            <button
              onClick={htmlToImageConvert}
              className="flex items-center justify-center gap-4"
            >
              <img
                src={download}
                alt="logo"
                height={25}
                width={25}
                className=""
              />
              <p className="text-white">Download Invoice</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
