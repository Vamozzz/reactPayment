import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Radio } from "@mui/material";
import { useFirstTheme, usePaymentLink } from "./page";
import CvvInfo from "./cvvInfo";

import upiSvg from "../assets/upi.svg";
import phonepaySvg from "../assets/phonepay.svg";
import paytmSvg from "../assets/paytm.svg";
import bhimlogoSvg from "../assets/bhimlogonew.svg";
import gpaylogoSvg from "../assets/gpaylogo.svg";
import addmoreSvg from "../assets/addmore.svg";
import cardSvg from "../assets/card.svg";
import emptywalletSvg from "../assets/emptywallet.svg";
import bankiconSvg from "../assets/bankicon.svg";

//

import axixbankSvg from "../assets/axixbank.svg";
import hdfcbankSvg from "../assets/hdfcbank.svg";
import icicibankSvg from "../assets/icicibank.svg";
import kotakbankSvg from "../assets/kotakbank.svg";
import sbibankSvg from "../assets/sbibank.svg";
import info from "../assets/information.svg";

import paylaterIcon from "../assets/paylater.svg";
import LazyPayIcon from "../assets/LazyPay.svg";
import simplIcon from "../assets/getsimplIcon.svg";

export default function PaymentType() {
  const [open, setOpen] = React.useState(true);
  const [openCard, setOpenCard] = React.useState(false);
  const [payLater, setPayLater] = React.useState(false);
  const [isNetBanking, setNetBanking] = React.useState(false);
  const { invoiceLink } = useFirstTheme();
  const { linkData, updatePaymentLink } = usePaymentLink();
  const [isAvailable, setAvailable] = React.useState(false);
  // const [showCvvInfo, setCvvInfo] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToPaymentApp = (selectedGateway: string) => {
    let paymentLink;
    switch (selectedGateway) {
      case "gpay":
        // window.location.href = `googlepay://upi/transaction?pa=${encodeURIComponent(
        //   paymentLink
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "tez://upi/");
        updatePaymentLink({
          link: paymentLink,
          app: "gpay",
        });
        break;
      case "phonepe":
        // window.location.href = `phonepe://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "phonepe://");
        updatePaymentLink({
          link: paymentLink,
          app: "phonepe",
        });
        break;
      case "paytm":
        // window.location.href = `paytm://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "paytmmp://");
        updatePaymentLink({
          link: paymentLink,
          app: "paytm",
        });
        break;
      case "bhim":
        // window.location.href = `bhim://upi/transaction?pa=${encodeURIComponent(
        //   invoiceLink?.link
        // )}`;
        paymentLink = invoiceLink?.link?.replace("upi://", "upi://pay?");
        updatePaymentLink({
          link: paymentLink,
          app: "bhim",
        });
        break;
      default:
        console.error("Unsupported payment gateway");
    }
  };

  //    const redirectToPaymentApp = (selectedGateway: string) => {
  // console.log(selectedGateway,"wertyui");

  //    }

  const paymentMethods = [
    {
      icon: phonepaySvg,
      name: "Phone Pe",
      link: "",
      appName: "phonepe",
    },
    {
      icon: paytmSvg,
      name: "Paytm",
      link: "",
      appName: "paytm",
    },
    {
      icon: bhimlogoSvg,
      name: "BHIM",
      link: "",
      appName: "bhim",
    },
    {
      icon: gpaylogoSvg,
      name: "Gpay",
      link: "",
      appName: "gpay",
    },
  ];

  const payLaterArray = [
    {
      name: "ICICI Pay later",
      icon: paylaterIcon,
      value: "",
    },
    {
      name: "Lazypay",
      icon: LazyPayIcon,
      value: "",
    },
    {
      name: "Lazypay",
      icon: simplIcon,
      value: "",
    },
  ];

  const netBankingArray = [
    {
      name: "Axis Bank",
      icon: axixbankSvg,
      value: "",
    },
    {
      name: "HDFC Bank",
      icon: hdfcbankSvg,
      value: "",
    },
    {
      name: "ICICI Bank",
      icon: icicibankSvg,
      value: "",
    },
    {
      name: "Kotak Bank",
      icon: kotakbankSvg,
      value: "",
    },
    {
      name: "SBI Bank",
      icon: sbibankSvg,
      value: "",
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
    updatePaymentLink({
      link: "",
      app: "",
    });
  };
  const handleCard = () => {
    setOpenCard(!openCard);
  };
  const handlePayLater = () => {
    setPayLater(!payLater);
  };

  const handleNetBanking = () => {
    setNetBanking(!isNetBanking);
  };

  return (
    <div className="my-4 shadow-lg rounded-xl">
      <List
        sx={{
          width: "100%",
          minWidth: 275,
          bgcolor: "background.paper",
          borderRadius: 4,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon className="">
            <img src={upiSvg} alt="logo" height={20} width={20} className="" />
          </ListItemIcon>
          <ListItemText primary="UPI" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <div className="flex gap-3 justify-between flex-wrap p-4 bg-[#F5F5F5]">
            {paymentMethods.map((item, index) => (
              <button
                onClick={() => {
                  redirectToPaymentApp(item.appName);

                  console.log("gatewayClicked", item.appName);
                }}
                key={index}
                className={`p-1 w-1/5 flex flex-col justify-start items-center gap-2 ${
                  linkData?.app === item.appName
                    ? "border border-purple-500 rounded-lg bg-white"
                    : null
                }`}
              >
                <img src={item.icon} alt="." height={40} width={40} />
                <p className={`text-wrap ${ linkData?.app === item.appName ?  " ":"text-[#ABABAB]"}`}>{item.name}</p>
              </button>
            ))}
          </div>
        </Collapse>
        <ListItemButton onClick={handleCard}>
          <ListItemIcon className="">
            <img src={cardSvg} alt="logo" height={20} width={20} className="" />
          </ListItemIcon>
          <ListItemText primary="CARD" />
          {openCard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {isAvailable ? (
          <Collapse
            in={openCard}
            timeout="auto"
            unmountOnExit
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <div className="flex gap-3 flex-wrap p-4 bg-[#F5F5F5]">
              <div className="flex items-center justify-between w-full p-2 border rounded-md ">
                <input
                  placeholder="Card Number"
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <input
                placeholder="Name on card"
                className="w-full p-2 bg-transparent border rounded-md outline-none"
              />
              <div className="flex gap-3">
                <input
                  placeholder="Valid Thru (MM/YY)"
                  className="w-2/3 p-2 bg-transparent border rounded-md outline-none"
                />
                <div className="flex items-center justify-between w-1/3 p-2 border rounded-md ">
                  <input
                    placeholder="CVV"
                    className="overflow-x-hidden bg-transparent rounded-md outline-none"
                  />
                  <button onClick={handleClick}>
                    <img
                      src={info}
                      alt="logo"
                      height={30}
                      width={30}
                      className="ml-2"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Collapse>
        ) : (
          <Collapse
            in={openCard}
            timeout="auto"
            unmountOnExit
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <div className="flex gap-3 flex-wrap p-4 text-center bg-[#F5F5F5]">
              <p>This functionality is currently unavailable for this trader</p>
            </div>
          </Collapse>
        )}

        <ListItemButton onClick={handlePayLater}>
          <ListItemIcon className="">
            <img
              src={emptywalletSvg}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="PAY LATER" />
          {payLater ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {isAvailable ? (
          <Collapse in={payLater} timeout="auto" unmountOnExit>
            <div className="bg-[#F5F5F5] flex flex-col px-2">
              {payLaterArray.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-dashed"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt="." height={40} width={40} />
                    <p>{item.name}</p>
                  </div>
                  <div>
                    {/* <img src={item.icon} alt="." height={40} width={40} />
                     */}
                    <Radio
                      checked={false}
                      // onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                          background: "white",
                          borderRadius: 10,
                        },
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Collapse>
        ) : (
          <Collapse in={payLater} timeout="auto" unmountOnExit>
            <div className="flex gap-3 flex-wrap p-4 text-center bg-[#F5F5F5]">
              <p>This functionality is currently unavailable for this trader</p>
            </div>
          </Collapse>
        )}
        <ListItemButton onClick={handleNetBanking}>
          <ListItemIcon className="">
            <img
              src={bankiconSvg}
              alt="logo"
              height={20}
              width={20}
              className=""
            />
          </ListItemIcon>
          <ListItemText primary="NET BANKING" />
          {isNetBanking ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {isAvailable ? (
          <Collapse in={isNetBanking} timeout="auto" unmountOnExit>
            <div className="bg-[#F5F5F5] flex flex-col px-2">
              {netBankingArray.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-dashed"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt="." height={40} width={40} />
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <Radio
                      checked={false}
                      // onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                          background: "white",
                          borderRadius: 10,
                        },
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Collapse>
        ) : (
          <Collapse in={isNetBanking} timeout="auto" unmountOnExit>
            <div className="flex gap-3 flex-wrap p-4 text-center bg-[#F5F5F5]">
              <p>This functionality is currently unavailable for this trader</p>
            </div>
          </Collapse>
        )}
      </List>
      {/* {showCvvInfo && ( */}
      <CvvInfo
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
      {/* )} */}
    </div>
  );
}
