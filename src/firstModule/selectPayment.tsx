import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import star from "../assets/Star.svg";
import vampayIcon from "../assets/vampayIcon.svg";
import tag from "../assets/tag.svg";
import CustomInput from "../components/customInput";

export default function SelectPayment() {
  const [couponNumber, setCouponNumber] = React.useState<string>("");
  const [isApplied, setIsApplied] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const applyCoupon = () => {
    setIsApplied(!isApplied);
    setError("");
  };
  return (
    <div className="">
      <Card sx={{ minWidth: 275, borderRadius: 4 }}>
        <CardContent>
          <div className="flex">
            <img alt="star" src={star} height={20} width={20} />
            <p className="ml-2">RECOMMENDED</p>
          </div>
        </CardContent>
        <Divider className="" />
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <Radio
                checked={false}
                // onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 35,
                  },
                  margin: 0,
                  padding: 0,
                }}
              />
              <div className="flex flex-col gap-2 ">
                <div className="flex items-start justify-start">
                  <img
                    src={vampayIcon}
                    alt="logo"
                    height={30}
                    width={30}
                    className="p-1"
                  />
                  <div className="flex items-start justify-start">
                    <p className="text-lg font-semibold text-gray-800 font-poppins leading-160">
                      Pay from any bank account
                    </p>
                  </div>
                </div>
                <p className="text-sm font-normal leading-6 text-gray-700 font-poppins">
                  add bank to vampay UPI; pay straight from account
                </p>
              </div>
            </div>
            <div className="flex items-center justify-around gap-2 p-2 border border-purple-500 rounded-md">
              <div>
                <img src={tag} alt="logo" height={30} width={30} className="" />
              </div>

              <p className="text-gray-700 text-[12px] font-poppins font-semibold">
                Upto 100 Cashback through Vampay UPI
              </p>
              <button
                onClick={applyCoupon}
                className="text-[#5A5CE7] font-poppins text-base font-semibold leading-7"
              >
                Apply
              </button>
            </div>
            {isApplied && (
              <div className="flex flex-col gap-3">
                <div className="w-full heading text-wrap ">
                  <CustomInput
                    value={couponNumber}
                    placeholder="Enter Coupon"
                    onChange={(e) => {
                      setCouponNumber(e.target.value);
                    }}
                    customStyle={{ height: 50 }}
                  />
                </div>
                <button
                  onClick={() => setError("Invalid Coupon")}
                  className="bg-[#5A5CE7] shadow-md w-full rounded-[5px] py-2 text-white font-bold"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
          <p className="py-1 text-center text-red-700">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
}
