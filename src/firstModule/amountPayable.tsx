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
  setPayableAmount: React.Dispatch<React.SetStateAction<string>>;
}

const AmountPayable: React.FC<firstmodule> = ({
  setPayableAmount,
  payableAmount,
}) => {
  const { invoiceData } = useFirstModule();
  const [error, setError] = React.useState<string>("");

  const Validation = (number: string) => {
    let isValid = true;
    const regex = /^[0-9]+$/;
    if (!regex.test(number) || number === "") {
      setError("Kindly enter a valid amount");
      isValid = false;
    }
    console.log(isValid, "isValid");

    return isValid;
  };

  const setPaymentAmount: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!Validation(e.target.value)) {
      setPayableAmount("");
    } else {
      setPayableAmount(e.target.value);
      setError("");
    }
  };

  return (
    <div className="">
      <Card
        sx={{
          minWidth: 275,
          borderRadius: 4,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <div className="px-6 py-4">
            <div className="pb-2 text-[24px] heading text-center opacity-75 text-black">
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
                customStyle={{ height: 50 , fontSize:30}}
              />
            </div>

            <div className="mx-10 border-b border-black opacity-20"></div>
            <p className="text-red-700 text-center">{error}</p>
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
