import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import vampayLogo from "../assets/vampay.svg";
import UPIlogo from "../assets/upinew12.svg";
import VISA from "../assets/visanew12.svg";
import MASTERCARD from "../assets/masternew12.svg";
import RUPAY from "../assets/rupaynew12.svg";
import yesbank from "../assets/yesbanknew12.svg";


import CreateInvoice from "../helper/createInvoice";

export default function FooterLink() {
  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 ,boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <img src={vampayLogo} alt="." height={50} width={120} />
            <div className="flex gap-2">
            
            <img src={yesbank} alt="yes bank logo" height={30} width={40} />
            <img src={UPIlogo} alt="UPI Logo" height={30} width={40} />
              <img src={VISA} alt="VISA Logo" height={30} width={40} />
              <img src={MASTERCARD} alt="MASTERCARD Logo" height={30} width={40} />
              <img src={RUPAY} alt="RUPAY Logo" height={30} width={40} />
            </div>
            <p className="text-[12px] ">
              want to create payment links for your business? visit
              <span className="uppercase text-[#8875FF]" onClick={CreateInvoice}>
                {" "}
                vampay.com/payment-links{" "}
              </span>{" "}
              and get started instantly. please report this payment link if you
              find it to be suspicious report payment link
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
