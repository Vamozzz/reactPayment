import React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import { Link } from "react-router-dom";
import { usePaymentLink } from "./page";

const drawerBleeding = 110;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  submitted: boolean; // Define the prop here
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}
const openWindow = window;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function DetailsPuller(props: Props) {
  const { window, submitted, setSubmitted } = props;
  const [open, setOpen] = useState(false);
  const { invoiceData } = useFirstModule();
  const { linkData } = usePaymentLink();

  const to = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const toggleDetails = () => {
    setOpen(!open);
  };

  // This is used only for the example
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;
  const container = window !== undefined ? window().document.body : undefined;

  return (
    // <Root>
    <div onClick={() => setOpen(!open)}>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDetails}
        onOpen={toggleDetails}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: linkData?.link ? true : false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />

          <div className="p-8 flex justify-around items-center ">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[28px]">{` ₹ ${invoiceData?.payable_amount}`}</p>
              <button
                className="text-[#5A5CE7] cursor-pointer"
                onClick={toggleDetails}
              >
                {open ? "HIDE" : "VIEW"} DETAILS
              </button>
            </div>
            <div
              className={`${
                !linkData?.link ? grey : "bg-[#5A5CE7]"
              }  rounded-md`}
            >
              <Button
                variant="contained"
                disabled={!linkData?.link}
                size="large"
                
                onClick={(event) => {
                  event.stopPropagation();
                  console.log("click pay",window !== undefined ,linkData?.link);

                  if (linkData?.link) {
                    const paymentAppLink = linkData.link;
                    openWindow?.open(paymentAppLink, "_blank");
                    setSubmitted(true);

                  }
                }}
              >
                {/* {linkData?.link ? (
                  <Link to={linkData.link}>Pay now</Link>
                  // " "
                ) : ( */}
                Pay now
                {/* )} */}
              </Button>
            </div>
          </div>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
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
      </SwipeableDrawer>
    </div>
    // </Root>
  );
}
