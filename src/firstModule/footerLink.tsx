import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import vampayLogo from "../assets/vampay.svg";
import UPIlogo from "../assets/UPIlogo.svg";
import VISA from "../assets/VISA.svg";
import MASTERCARD from "../assets/MASTERCARD.svg";
import RUPAY from "../assets/RUPAY.svg";
import CreateInvoice from "../helper/createInvoice";

export default function FooterLink() {
  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className="flex flex-col gap-2">
            <img src={vampayLogo} alt="." height={50} width={120} />
            <div className="flex gap-2">
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
              and get started instantly. please report thi payment link if you
              find it to be suspicious report payment link
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
