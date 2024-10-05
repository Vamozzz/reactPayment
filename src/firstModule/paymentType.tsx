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
import { Autocomplete, Box, Button, Radio, TextField } from "@mui/material";
import { useFirstTheme, usePaymentLink } from "./page";
import CvvInfo from "./cvvInfo";

import upiSvg from "../assets/upi.svg";
import phonepaySvg from "../assets/phonepaynew12.svg";
import paytmSvg from "../assets/Paytmnew12.svg";
import bhimlogoSvg from "../assets/bhimnew12.svg";
import gpaylogoSvg from "../assets/gpaynew12.svg";
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
import successupi from "../assets/upisuccess.svg";
import failedupi from "../assets/upifailed.svg";
import { useFirstModule } from "../provider/invoiceProvider";
import Popup from "../components/popup";

interface CountryType {
  code: string;
  label: string;
  img: string;
}
interface firstmodule {
  payableAmount: string;
  setPayableAmount: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentType: React.FC<firstmodule> = ({
  setPayableAmount,
  payableAmount,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openCard, setOpenCard] = React.useState(false);
  const [payLater, setPayLater] = React.useState(false);
  const [isNetBanking, setNetBanking] = React.useState(false);
  const { invoiceLink } = useFirstTheme();
  const { invoiceData } = useFirstModule();
  const { linkData, updatePaymentLink } = usePaymentLink();
  const [isAvailable, setAvailable] = React.useState(false);
  const [upiId, setUpiId] = React.useState("");
  const [isVerified, setVerified] = React.useState<boolean | undefined>(
    undefined
  );
  const [upiMessage, setUpiMessage] = React.useState({
    error: "",
    success: "",
    userName: "",
  });
  const [htmlContent, setHtmlContent] = React.useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
  const [cardData, setCardData] = React.useState({
    txn_mode: "DC",
    card_number: "",
    card_holder_name: "",
    card_cvv: "",
    card_expiry_date: "",
  });

  const [selectedBank, setSelectedBank] = React.useState("");

  const fetchHtmlContent = async () => {
    openPopup();
    try {
      const response = await fetch(
        "https://backend.vaamozdevelop.xyz/VampayLiveApi/EasebuzzDebitPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://vaamoz.com",
          },
          body: JSON.stringify({
            txn_mode: "DC",
            card_number: "4355840103507358",
            card_holder_name: "Mohammed Shaikh",
            card_cvv: "779",
            card_expiry_date: "11/26",
          }),
        }
      );
      const html = await response.text();

      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // const [showCvvInfo, setCvvInfo] = React.useState(false);
  const handleUpiId = (e: any) => {
    setUpiId(e.target.value);
  };

  const verifyUpiID = async () => {
    const response = await fetch(
      "https://api.vampay.in/Merchent/ValidateVpaId",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vpa_id: upiId }),
      }
    );
    const data = await response.json();
    if (data.status) {
      setVerified(true);

      updatePaymentLink({
        link: "payViaUPI",
        app: "",
        upiId: "9734570474@ybl",
      });
      setUpiMessage({
        error: "",
        success: data.message,
        userName: data?.data?.name,
      });
    } else {
      setUpiMessage({
        error: data.message,
        success: "",
        userName: "",
      });
    }
  };

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
          upiId: "",
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
          upiId: "",
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
          upiId: "",
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
          upiId: "",
        });
        break;
      default:
        console.error("Unsupported payment gateway");
    }
  };

  // updatePaymentLink({
  //   link: "payViaUPI",
  //   app: "bhim",
  //   upiId: "",
  // });

  //    const redirectToPaymentApp = (selectedGateway: string) => {

  //    }

  const paymentMethods = [
    {
      icon: phonepaySvg,
      name: "PhonePe",
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
      label: "Axis Bank",
      icon: axixbankSvg,
      value: "",
    },
    {
      label: "HDFC Bank",
      icon: hdfcbankSvg,
      value: "",
    },
    {
      label: "ICICI Bank",
      icon: icicibankSvg,
      value: "",
    },
    {
      label: "Kotak Bank",
      icon: kotakbankSvg,
      value: "",
    },
    {
      label: "SBI Bank",
      icon: sbibankSvg,
      value: "",
    },
  ];

  const handleSelectionChange = (event: React.SyntheticEvent, value: any) => {
    value?.code && setSelectedBank(value?.code);
  };

  const handleNetBankingSubmit = async () => {
    openPopup();
    try {
      const response = await fetch(
        "https://backend.vaamozdevelop.xyz/VampayLiveApi/EasebuzzNetBanking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://vaamoz.com",
          },
          body: JSON.stringify({
            amount: payableAmount,
            bank: selectedBank,
          }),
        }
      );
      const html = await response.text();

      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };
  console.log("Selected value:", selectedBank);
  const netBankingType: readonly CountryType[] = [
    { code: "AXB", label: "Axis Bank ", img: axixbankSvg },
    {
      code: "BANB",
      label: "Bandhan Bank",
      img: "axixbankSvg",
    },
    { code: "HDFCB", label: "HDFC Bank", img: hdfcbankSvg },
    {
      code: "ICICIB",
      label: "ICICI Bank",
      img: icicibankSvg,
    },
    {
      code: "SBOI",
      label: "State Bank of India",
      img: sbibankSvg,
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
    updatePaymentLink({
      link: "",
      app: "",
      upiId: "",
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
                }}
                key={index}
                className={`p-1 w-1/5 flex flex-col justify-start items-center gap-2 ${
                  linkData?.app === item.appName
                    ? "border border-purple-500 rounded-lg bg-white"
                    : null
                }`}
              >
                <img src={item.icon} alt="." height={40} width={40} />
                <p
                  className={`text-wrap ${
                    linkData?.app === item.appName
                      ? "text-[14px]"
                      : "text-[#ABABAB]"
                  }`}
                >
                  {item.name}
                </p>
              </button>
            ))}
            {"invoiceData?.vpa_collection" && (
              <div className="flex w-full flex-col gap-3 justify-between flex-wrap  bg-[#F5F5F5]">
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex items-center justify-between w-full p-2 border rounded-md ">
                    <input
                      placeholder="Enter UPI"
                      className="w-full bg-transparent outline-none"
                      value={upiId}
                      onChange={handleUpiId}
                    />
                    {isVerified === true ? (
                      <img src={successupi} alt="upi status" className="px-2" />
                    ) : isVerified === false ? (
                      <img src={failedupi} alt="upi status" className="px-2" />
                    ) : null}
                  </div>
                  <Button
                    style={{
                      color: "white",
                      background: "#6769FE",
                      boxShadow: "none",
                    }}
                    size="large"
                    variant="contained"
                    className="text-nowrap"
                    onClick={() => verifyUpiID()}
                    disabled={isVerified}
                  >
                    {isVerified ? "verified" : "Verify"}
                  </Button>
                </div>
                <div className="flex items-center justify-between ">
                  {upiMessage.error ? (
                    <p className="text-red-600">{upiMessage.error}</p>
                  ) : (
                    <p className="text-green-600">{upiMessage.userName}</p>
                  )}
                  <p className="text-green-600">{upiMessage.success}</p>
                </div>
              </div>
            )}
          </div>
        </Collapse>
        <ListItemButton onClick={handleCard}>
          <ListItemIcon className="">
            <img src={cardSvg} alt="logo" height={20} width={20} className="" />
          </ListItemIcon>
          <ListItemText primary="CARD" />
          {openCard ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {true ? (
          <Collapse
            in={openCard}
            timeout="auto"
            unmountOnExit
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <div className="flex gap-3 flex-wrap p-4 bg-[#F5F5F5]">
              <div className="flex items-center justify-between w-full p-2 border rounded-md ">
                <input
                  type="number"
                  name="card_number"
                  placeholder="Card Number"
                  className="w-full bg-transparent outline-none"
                  value={cardData?.card_number}
                  onChange={handleCardChange}
                />
              </div>
              <input
                name="card_holder_name"
                placeholder="Name on card"
                className="w-full p-2 bg-transparent border rounded-md outline-none"
                value={cardData?.card_holder_name}
                onChange={handleCardChange}
              />
              <div className="flex gap-3">
                <input
                  name="card_expiry_date"
                  placeholder="Valid Thru (MM/YY)"
                  className="w-2/3 p-2 bg-transparent border rounded-md outline-none"
                  value={cardData?.card_expiry_date}
                  onChange={handleCardChange}
                />
                <div className="flex items-center justify-between w-1/3 p-2 border rounded-md">
                  <input
                    type="number"
                    name="card_cvv"
                    placeholder="CVV"
                    className="overflow-x-hidden bg-transparent rounded-md outline-none"
                    value={cardData?.card_cvv}
                    onChange={handleCardChange}
                  />
                  {/* <button onClick={handleClick}>
                    <img
                      src={info}
                      alt="logo"
                      height={30}
                      width={30}
                      className="ml-2"
                    />
                  </button> */}
                </div>
                <Button variant="contained" onClick={fetchHtmlContent}>
                  Submit
                </Button>
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
              <p className="font-medium text-[14px] text-[#ABABAB]">
                This functionality is currently unavailable for this trader
              </p>
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
              <p className="font-medium text-[14px] text-[#ABABAB]">
                This functionality is currently unavailable for this trader
              </p>
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
        {true ? (
          <Collapse in={isNetBanking} timeout="auto" unmountOnExit>
            <div className="bg-[#F5F5F5] flex flex-col px-2 p-2 gap-4">
              {/* {netBankingArray.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-dashed"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.icon} alt="." height={40} width={40} />
                    <p>{item.name}</p>
                  </div>
                </div>
              ))} */}
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={netBankingType}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={handleSelectionChange}
                renderOption={(props, option) => {
                  const { ...optionProps } = props;
                  return (
                    <Box
                      // key={key}
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      <img loading="lazy" width="20" src={option?.img} alt="" />
                      {option.label}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a Bank"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
              <Button
                variant="contained"
                onClick={handleNetBankingSubmit}
                disabled={
                  !(
                    payableAmount !== "" &&
                    selectedBank !== "" &&
                    Number(payableAmount) > 0
                  )
                }
              >
                Submit
              </Button>
            </div>
          </Collapse>
        ) : (
          <Collapse in={isNetBanking} timeout="auto" unmountOnExit>
            <div className="flex gap-3 flex-wrap p-4 text-center bg-[#F5F5F5]">
              <p className="font-medium text-[14px] text-[#ABABAB]">
                This functionality is currently unavailable for this trader
              </p>
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
      <Popup
        htmlContent={htmlContent}
        onClose={closePopup}
        isOpen={isPopupOpen}
      />
    </div>
  );
};

export default PaymentType;
