import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFirstModule } from "../provider/invoiceProvider";

export default function AmountPayable() {
  const { invoiceData } = useFirstModule();

  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 ,boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <div className="p-1 text-center ">
            <div className="heading">
              <p className="text-[24px] opacity-75">Amount Payable</p>
            </div>

            <div className="flex items-center justify-center gap-1 ">
              <p className="text-[28px] text-black opacity-75">₹ </p>
              <p className="font-bold text-[30px] text-wrap font-[inter] text-black">
                
              {invoiceData?.payable_amount || "-"}
              </p>
              
            </div>
            <div className="mx-10 border-b border-black opacity-20"></div>
          </div>
          {/* <div className="p-1">
            <p className="uppercase subHeader">payment Id</p>
            <p className="uppercase paymentId">{invoiceData?.transaction_id}</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}


