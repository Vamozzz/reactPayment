import React from "react";
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

export default function Queries() {
  const { invoiceData } = useFirstModule();

  const handleCall = () => {
    window.open(`tel:${invoiceData?.merchant_mobile}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${invoiceData?.merchant_email}`, "_self");
  };

  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className="flex flex-col gap-2 p-2">
            <p className="text-[12px] ml-2">
              For any queries, Please contact
              <span className="font-bold"> {invoiceData?.merchnat_name}</span>
            </p>
            <div className="flex flex-wrap gap-2 ">
              <div className="flex gap-2" onClick={handleCall}>
                <img
                  src={Phone_light}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.merchant_mobile}</p>
              </div>
              <div className="flex gap-2 " onClick={handleEmail}>
                <img
                  src={Message_light}
                  alt={"."}
                  width={20}
                  height={20}
                />
                <p>{invoiceData?.merchant_email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
