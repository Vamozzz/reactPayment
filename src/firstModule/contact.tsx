import React, { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import Message_light from "../assets/Message_light.svg";
import Phone_light from "../assets/Phone_light.svg"

interface contactProps {
  paymentData?: {
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

const Queries: FC<contactProps> = ({ paymentData }) => {
  const { invoiceData } = useFirstModule();

  const handleCall = () => {
    window.open(`tel:${invoiceData?.vendor_number || paymentData?.merchant_mobile}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${invoiceData?.vendor_email || paymentData?.merchant_email}`, "_self");
  };

  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 ,boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <CardContent>
          <div className="flex flex-col gap-2 p-2">
            <p className="text-[12px] ml-2">
              For any queries, Please contact
              <span className="font-bold"> {invoiceData?.vendor_name || paymentData?.merchant_name}</span>
            </p>
            <div className="flex flex-wrap gap-2 ">
              <div className="flex gap-2" onClick={handleCall}>
                <img
                  src={Phone_light}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.vendor_number || paymentData?.merchant_mobile}</p>
              </div>
              <div className="flex gap-2 " onClick={handleEmail}>
                <img
                  src={Message_light}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.vendor_email || paymentData?.merchant_email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Queries;
