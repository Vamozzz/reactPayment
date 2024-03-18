import React from "react";
import { useState } from "react";
import CvvInfo from "./cvvInfo";
import { Radio } from "@mui/material";
import { useFirstTheme, usePaymentLink } from "./page";

import axixbankIcon from "../assets/axixbank.svg";
import hdfcbankIcon from "../assets/hdfcbank.svg";
import icicibankIcon from "../assets/icicibank.svg";
import kotakbankIcon from "../assets/kotakbank.svg";
import sbibankIcon from "../assets/sbibank.svg";
import phonepayIcon from "../assets/phonepay.svg";
import paytmIcon from "../assets/paytm.svg";
import bhimIcon from "../assets/bhimlogo.svg";
import gpayIcon from "../assets/gpaylogo.svg";
import addmoreIcon from "../assets/addmore.svg";
import paylaterIcon from "../assets/paylater.svg";
import LazyPayIcon from "../assets/LazyPay.svg";
import simplIcon from "../assets/getsimplIcon.svg";
import upiAnimatedIcon from "../assets/upiAnimated3.svg";
import creditDebitIcon from "../assets/creditDebit3.svg";
import payLaterIcon from "../assets/payLater3.svg";
import netBankingIcon from "../assets/netBanking3.svg";
import crossArrowIcon from "../assets/crossArrow.svg";
import informationIcon from "../assets/information.svg";
import phonepayTheme2 from "../assets/phonepayTheme2.svg";
import paytmTheme2 from "../assets/paytmTheme2.svg";
import bhimTheme2 from "../assets/bhimTheme2.svg";
import gpayTheme2 from "../assets/gpayTheme2.svg";
import UPITheme2 from "../assets/UPITheme2.svg";
import creditcardTheme2 from "../assets/creditcardTheme2.svg";
import WalletTheme2 from "../assets/WalletTheme2.svg";
import NetbankingTheme2 from "../assets/NetbankingTheme2.svg";


const SecondPaymentType = () => {
  const [upi, setUpi] = useState(true);
  const [openCard, setOpenCard] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [isNetBanking, setNetBanking] = useState(false);
  const [selectedType, setSelectedType] = useState("UPI");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { invoiceLink } = useFirstTheme();
  const { linkData, updatePaymentLink } = usePaymentLink();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const netBankingArray = [
    {
      name: "Axis Bank",
      icon: axixbankIcon,
      value: "",
    },
    {
      name: "HDFC Bank",
      icon: hdfcbankIcon,
      value: "",
    },
    {
      name: "ICICI Bank",
      icon: icicibankIcon,
      value: "",
    },
    {
      name: "Kotak Bank",
      icon: kotakbankIcon,
      value: "",
    },
    {
      name: "SBI Bank",
      icon: sbibankIcon,
      value: "",
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

  const paymentType = [
    {
      id: 1,
      name: "UPI",
      link: "",
      image: UPITheme2,
    },
    {
      id: 2,
      name: "Credit/Debit",
      link: "",
      image: creditcardTheme2,
    },
    {
      id: 3,
      name: "Pay Later",
      link: "",
      image: WalletTheme2,
    },
    {
      id: 4,
      name: "Net Banking",
      link: "",
      image: NetbankingTheme2,
    },
  ];

  const UpiType = [
    {
      id: 1,
      name: "UPI",
      link: "",
      image: phonepayTheme2,
      appName: "phonepe",
    },
    {
      id: 2,
      name: "Credit/Debit",
      link: "",
      image: paytmTheme2,
      appName: "paytm",
    },
    {
      id: 3,
      name: "Pay Later",
      link: "",
      image: bhimTheme2,
      appName: "bhim",
    },
    {
      id: 4,
      name: "Net Banking",
      link: "",
      image: gpayTheme2,
      appName: "gpay",
    },
  ];

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

      // case "addmore":
      //   // window.location.href = `bhim://upi/transaction?pa=${encodeURIComponent(
      //   //   invoiceLink?.link
      //   // )}`;
      //   paymentLink = invoiceLink?.link;
      //   updatePaymentLink({
      //     link: paymentLink,
      //     app: "addmore",
      //   });
      //   break;
      default:
        console.error("Unsupported payment gateway");
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-wrap gap-2 my-2 ">
          {paymentType.map((item, index) => (
            <button
              key={item?.id}
              onClick={() => {
                updatePaymentLink({
                  link: "",
                  app: "",
                });
                setSelectedType(item.name);
              }}
              className={`h-[10vh]  ${
                selectedType === item.name
                  ? "bg-[#E5E5E5] border-white "
                  : "bg-[#FFFFFF] border-[#E5E5E5] "
              }  text-[12px] flex flex-[45%] flex-col justify-center items-center border-2 rounded-2xl`}
            >
              <img
                src={item.image}
                alt={"type"}
                width={50}
                height={50}
                className="object-none"
              />
              <p>{item.name}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedType == "UPI" && (
        <div className="flex items-center justify-between gap-2 py-4">
          {UpiType.map((item, index) => (
            <button
              key={item?.id}
              onClick={() => redirectToPaymentApp(item.appName)}
              className={`h-[6vh] w-1/4 p-2 flex  justify-center items-center border-2  ${
                linkData?.app === item.appName
                  ? "bg-[#FFFFFF}] border-white "
                  : "bg-white border-[#E5E5E5]"
              } rounded-xl`}
            >
              <img
                src={item.image}
                alt={"type"}
                width={80}
                height={50}
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
      {selectedType == "Credit/Debit" && (
        <div className="flex flex-wrap gap-3 p-6 bg-white rounded-xl">
          <div className="flex items-center justify-between w-full p-2 border rounded-md ">
            <input
              placeholder="Card Number"
              className="w-full bg-transparent outline-none"
            />
            {/* <img
                src={"/tag.svg"}
                alt="logo"
                height={30}
                width={30}
                className="ml-2"
              /> */}
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
                  src={informationIcon}
                  alt="logo"
                  height={30}
                  width={30}
                  className="ml-1"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedType == "Pay Later" && (
        <div className="flex flex-col px-2 bg-white rounded-2xl">
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
      )}
      {selectedType == "Net Banking" && (
        <div className="flex flex-col px-2 bg-white rounded-2xl">
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
      )}
      <CvvInfo
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
      />
    </div>
  );
};

export default SecondPaymentType;
