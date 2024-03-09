import React, { useEffect, useState } from "react";
import vampay from "../assets/vampay.svg";

function WaitPage() {
  const [isSecond, setSecond] = useState("00");
  const [isMinute, setMinute] = useState("00");

  useEffect(() => {
    countdownTimer(300);
  }, []);

  function countdownTimer(durationInSeconds: number) {
    let seconds = durationInSeconds;

    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const displayMinutes = String(minutes).padStart(2, "0");
      setMinute(displayMinutes);
      const displaySeconds = String(remainingSeconds).padStart(2, "0");
      setSecond(displaySeconds);
      //   console.log(`${displayMinutes}:${displaySeconds}`);

      seconds--;

      if (seconds < 0) {
        clearInterval(countdownInterval);
        // console.log("Countdown finished!");
      }
    }, 1000);
  }

  return (
    <div className="relative h-[90vh] flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <p className="font-normal text-[40px]">
          {isMinute}:{isSecond}
        </p>
        <p className="font-normal text-[16px] text-[#EF0000] ">Remaining</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-semibold text-[24px]">Hold On!</p>
        <p className="font-normal text-[16px]">
          We are verifying your payment status
        </p>
      </div>
      <div className="flex justify-center items-center fixed bottom-8">
        <p>Powered by</p>
        <img src={vampay} alt="." height={50} width={120} />
      </div>
    </div>
  );
}

export default WaitPage;
