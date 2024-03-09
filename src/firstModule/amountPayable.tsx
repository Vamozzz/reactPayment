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
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className=" flex justify-between items-end p-1 ">
            <div className="heading">
              <p>amount payable:</p>
            </div>

            <div>
              <p className="heading text-wrap">
                ₹ {invoiceData?.payable_amount || "-"}
              </p>
            </div>
          </div>
          <div className="p-1">
            <p className="subHeader uppercase">payment Id</p>
            <p className="paymentId uppercase">{invoiceData?.transaction_id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
