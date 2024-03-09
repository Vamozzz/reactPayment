import { useFirstModule } from "../provider/invoiceProvider";
import { Card, CardContent, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import successIconSvg from "../assets/successicon.svg";
import shareSvg from "../assets/share.svg";

const PaymentSuccess = () => {
  const { invoiceData } = useFirstModule();
  return (
    <div className="relative flex justify-center items-start">
      <div className=" absolute bg-[#34A853] p-3 rounded-full border-2 border-[#F1F1F1]">
        <img
          src={successIconSvg}
          alt="logo"
          height={30}
          width={30}
          className=""
        />
      </div>
      <div className="flex flex-col items-center gap-4 border-dashed bg-[#34A853] p-4 rounded-3xl mt-10 ">
        <div className="mt-10">
          <p>Thank you!</p>
        </div>
        <div className="mt-2">
          <p>Your transaction was successful</p>
        </div>

        <Card sx={{ minWidth: 275, borderRadius: 4 }}>
          <CardContent>
            <div className="flex flex-col justify-around items-start gap-4 p-2">
              <p className="text-gray-800 font-poppins text-base font-medium leading-6 ">
                Payment request from {invoiceData?.vendor_name}
              </p>
              <div>
                <p className="text-gray-600 font-poppins text-xs font-medium leading-6 uppercase">
                  payment for
                </p>
                <p className="text-black font-poppins text-base font-medium leading-6 capitalize">
                  {invoiceData?.vendor_name}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-poppins text-xs font-medium leading-6 uppercase">
                  AMOUNT PAYABLE
                </p>
                <p className="text-black font-poppins text-base font-medium leading-6 capitalize">
                  {invoiceData?.payable_amount}
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-poppins text-xs font-medium leading-6 uppercase">
                  payment Id
                </p>
                <p className="text-black font-poppins text-base font-medium leading-6 capitalize">
                  {invoiceData?.order_id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card sx={{ minWidth: 275, borderRadius: 4 }} className="w-full">
          <CardContent>
            <div className="flex flex-col gap-3 p-2 w-full">
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
            <div className="flex flex-col gap-2 justify-center items-center">
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
        <div className="border-t-4 w-full border-dashed my-10 "></div>
        <Card sx={{ minWidth: 275, borderRadius: 4 }} className="w-full">
          <CardContent>
            <div className="flex gap-4 justify-center items-center">
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
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
