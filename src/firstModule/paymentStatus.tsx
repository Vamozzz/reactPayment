import { useFirstModule } from "../provider/invoiceProvider";
import { Card, CardContent, Skeleton, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import "./loader.css";

const PaymentStatus = () => {
  const { invoiceData } = useFirstModule();

  return (
    <div className="relative flex justify-center items-start">
      <div className=" absolute flex justify-center items-center bg-[#E99A00] p-1 rounded-full border-2 border-[#F1F1F1] mb-10">
        {/* <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-500"></div> */}
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* <div className="absolute bg-[#E99A00] p-2 h-20 w-20 rounded-full border-2 border-[#F1F1F1] mb-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div> */}
      <div className=" bg-[#E99A00] flex flex-col items-center gap-4 border-dashed  p-4 rounded-3xl mt-10 ">
        <div className="mt-10 text-[26px] ">
          <p>Processing</p>
        </div>

        {/* <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        > */}
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
        {/* </StyledBox> */}
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
        {/* <Card sx={{ minWidth: 275, borderRadius: 4 }} className="w-full">
          <CardContent>
             <div className="flex gap-4 justify-center items-center">
              <img
                src={"/questionIcon.svg"}
                alt="logo"
                height={25}
                width={25}
                className=""
              />
              <p>Contact Vampay Support</p>
            </div>
           
          </CardContent>
        </Card> */}
        <Skeleton
          variant="text"
          className="w-full h-20 "
          sx={{ fontSize: "1rem", borderRadius: 3 }}
          animation="wave"
        />
      </div>
    </div>
  );
};

export default PaymentStatus;
