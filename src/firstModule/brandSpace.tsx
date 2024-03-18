// import img from "next/image";
// import React, { useEffect, useState } from "react";
// import BasicListLanguage from "./languageOption";
// import { useFirstModule } from "../provider/invoiceProvider";
// import { inVoiceData } from "../types/types.ts";
// import { Skeleton } from "@mui/material";

// const BrandSpace = () => {
//   const [language, setLanguage] = useState(false);
//   const { invoiceData } = useFirstModule();

//   const selectLanguage = () => {
//     setLanguage(!language);
//   };

//   return (
//     <div className="sticky top-0 z-10">
//       <div
//         className={`flex justify-center items-center py-6 ${
//           invoiceData?.bg_color
//             ? `bg-[${invoiceData?.bg_color}]`
//             : "bg-[#F1F1F1]"
//         } rounded-b-3xl `}
//       >
//         <div className="flex items-center justify-center w-2/3 gap-2 p-2 ">
//           {invoiceData?.merchant_logo ? (
//             <img
//               src={invoiceData?.merchant_logo || "/vampayIcon.svg"}
//               alt="merchant logo"
//               height={30}
//               width={30}
//               className=""
//             />
//           ) : (
//             <Skeleton variant="rounded" width={40} height={40} />
//           )}
//           {invoiceData?.merchant_name_logo ? (
//             <img
//               src={invoiceData?.merchant_name_logo || "/vampay.svg"}
//               alt="."
//               height={50}
//               width={120}
//             />
//           ) : (
//             <Skeleton variant="rounded" width={210} height={40} />
//           )}
//         </div>
//         {/* <div className="flex items-center justify-end w-1/3 pr-4">
//           <button onClick={selectLanguage}>
//             <img
//               src={"/languagedropdown.svg"}
//               alt="merchant name"
//               height={40}
//               width={40}
//               className=""
//             />
//           </button>
//         </div> */}
//       </div>
//       {/* {language ? (
//         <BasicListLanguage
//           language={language}
//           setLanguage={setLanguage}
//           selectLanguage={selectLanguage}
//         />
//       ) : null} */}
//     </div>
//   );
// };

// export default BrandSpace;

import React, { useEffect, useState } from "react";
import BasicListLanguage from "./languageOption";
import { useFirstModule } from "../provider/invoiceProvider";
import { Skeleton } from "@mui/material";
import abLogo from "../assets/vampay.svg";

const BrandSpace = () => {
  const [language, setLanguage] = useState(false);
  const { invoiceData } = useFirstModule();

  const selectLanguage = () => {
    setLanguage(!language);
  };

  return (
    <div className="sticky top-0 z-10">
      <div
        className={`flex justify-center items-center px-6 py-3 ${
          invoiceData?.bg_color
            ? `bg-[${invoiceData?.bg_color}]`
            : "bg-[#F1F1F1]"
        } rounded-b-3xl `}
      >
        <div className="flex items-center justify-center w-2/3 gap-2 p-2 ">
          <img
            src={invoiceData?.merchant_name_logo || abLogo}
            alt="."
            height={"100%"}
            width={"100%"}
          />
        </div>
        {/* <div className="flex items-center justify-end w-1/3 pr-4">
          <button onClick={selectLanguage}>
            <img
              src={"/languagedropdown.svg"}
              alt="merchant name"
              height={40}
              width={40}
              className=""
            />
          </button>
        </div> */}
      </div>
      {/* {language ? (
        <BasicListLanguage
          language={language}
          setLanguage={setLanguage}
          selectLanguage={selectLanguage}
        />
      ) : null} */}
    </div>
  );
};

export default BrandSpace;
