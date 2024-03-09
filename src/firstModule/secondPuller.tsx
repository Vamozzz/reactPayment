import React from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { usePaymentLink } from "./page";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

interface Props {
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecondPuller = ({ submitted, setSubmitted }: Props) => {
  const [open, setOpen] = useState(false);
  const { invoiceData } = useFirstModule();
  const { linkData } = usePaymentLink();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openWindow = window;

  const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: 13,
  }));

  return (
    <div
      className={`${
        !linkData?.link ? "absolute" : "fixed"
      } bottom-0  w-full lg:w-[500px] rounded-t-2xl bg-[#FFFFFF] border-2 p-3 overflow-hidden`}
    >
      <div className="flex justify-between font-semibold text-[22px] ">
        <p>Amount payable</p>
        <p className="text-wrap">₹ {invoiceData?.payable_amount}</p>
      </div>
      <div className="flex justify-start font-semibold text-[14px] text-[#5A5CE7] ">
        <button onClick={handleOpen}>view details</button>
      </div>
      <div className="flex justify-center items-center my-2">
        <button
          className={` ${
            !linkData?.link ? "bg-[#B6B6B6]" : "bg-[#5A5CE7]"
          } w-full text-[22px] font-semibold text-white rounded-lg p-2`}
          onClick={(event) => {
            event.stopPropagation();
            console.log("click pay");
            if (linkData?.link) {
              const paymentAppLink = linkData.link;
              openWindow.open(paymentAppLink, "_blank");
              setSubmitted(true);
            }
          }}
          disabled={!linkData?.link}
        >
            PAY NOW
        </button>
      </div>
      <p className="font-medium text-[10px] text-center">
        This payment will be processed by Vampay
      </p>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <StyledBox
            sx={{
              overflow: "auto",
            }}
          >
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
                      INR {invoiceData?.payable_amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-poppins text-xs font-medium leading-6 uppercase">
                      payment Id
                    </p>
                    <p className="text-black font-poppins text-base font-medium leading-6 capitalize">
                      {invoiceData?.transaction_id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StyledBox>
        </Modal>
      </div>
    </div>
  );
};

export default SecondPuller;
