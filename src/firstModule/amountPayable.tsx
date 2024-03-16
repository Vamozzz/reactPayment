import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFirstModule } from "../provider/invoiceProvider";
import CustomInput from "../components/customInput";

interface firstmodule {
  payableAmount: string;
  setPayableAmount:React.Dispatch<React.SetStateAction<string>>;
}

const AmountPayable: React.FC<firstmodule> = ({
  setPayableAmount,
  payableAmount,
}) => {
  const { invoiceData } = useFirstModule();
  const setPaymentAmount: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPayableAmount(e.target.value);
  };

  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className="px-6 py-4">
            <div className="pb-2 font-light heading">
              <p style={{ fontWeight: "normal" }} className="text-[24px]">
                Amount payable
              </p>
            </div>

            <div className="w-full heading text-wrap ">
              <CustomInput
                inputType="number"
                label="₹"
                value={payableAmount}
                placeholder="Enter Amount"
                onChange={setPaymentAmount}
                customStyle={{ height: 50 }}
              />
            </div>
          </div>
          {/* <div className="p-1">
            <p className="uppercase subHeader">payment Id</p>
            <p className="uppercase paymentId">{invoiceData?.transaction_id}</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AmountPayable;
