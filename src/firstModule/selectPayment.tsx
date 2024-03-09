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

export default function SelectPayment() {
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
            <div className="flex gap-2 justify-between items-start">
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
                <div className="flex justify-start items-start">
                  <img
                    src={vampayIcon}
                    alt="logo"
                    height={30}
                    width={30}
                    className="p-1"
                  />
                  <div className="flex justify-start items-start">
                    <p className="text-gray-800 font-poppins text-lg font-semibold leading-160">
                      Pay from any bank account
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-poppins text-sm font-normal leading-6">
                  add bank to vampay UPI; pay straight from account
                </p>
              </div>
            </div>
            <div className="flex justify-around items-center gap-2 rounded-md border border-purple-500 p-2">
              <div>
                <img src={tag} alt="logo" height={30} width={30} className="" />
              </div>

              <p className="text-gray-700 text-[12px] font-poppins font-semibold">
                Upto 100 Cashback through Vampay UPI
              </p>
              <p className="text-[#5A5CE7] font-poppins text-base font-semibold leading-7">
                Apply
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
