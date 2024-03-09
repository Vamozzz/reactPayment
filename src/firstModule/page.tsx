import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
} from "react";
import { useFirstModule } from "../provider/invoiceProvider";
import FirstTheme from "./firstTheme";
import SecondTheme from "./secondTheme";
import ThirdTheme from "./thirdTheme";

type ThemeContextData = {
  invoiceLink: { link: string; order_id: string } | null;
  loading: boolean;
};

export const FirstThemeContext = createContext<ThemeContextData>({
  invoiceLink: null,
  loading: true,
});

type LinkContextData = {
  linkData: {
    link?: string;
    app: string;
  } | null;
  loading: boolean;
  updatePaymentLink: (newData: { link?: string; app: string }) => void;
};

const PaymentLinkContext = createContext<LinkContextData>({
  linkData: null,
  loading: true,
  updatePaymentLink: () => {},
});

export const FirstThemeProvider = () => {
  const { invoiceData } = useFirstModule();
  const [themeData, setThemeData] =
    useState<ThemeContextData["invoiceLink"]>(null);
  const [paymentLink, setPaymentLink] = useState<LinkContextData["linkData"]>({
    link: "",
    app: "",
  });

  const updatePaymentLink = (newData: { link?: string; app: string }) => {
    setPaymentLink({
      link: newData.link || "",
      app: newData.app,
    });
  };

  useEffect(() => {
    if (invoiceData) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.vampay.in/Merchent/merchantInitiateInvoiceTransaction",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mobileNo: invoiceData.vendor_number,
                amount: invoiceData.payable_amount,
                invoiceId: invoiceData.invoiceId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          setThemeData({
            link: data.data.link,
            order_id: data.data.order_id,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [invoiceData]);

  return (
    <FirstThemeContext.Provider
      value={{ invoiceLink: themeData, loading: !themeData }}
    >
      <PaymentLinkContext.Provider
        value={{ linkData: paymentLink, loading: false, updatePaymentLink }}
      >
        {/* {invoiceData?.template_id === 1 && <FirstTheme />} */}
        {/* {invoiceData?.template_id === 1 && <SecondTheme />} */}
        {invoiceData?.template_id === 1 && <ThirdTheme />}
      </PaymentLinkContext.Provider>
    </FirstThemeContext.Provider>
  );
};

export const useFirstTheme = () => {
  return useContext(FirstThemeContext);
};

export const usePaymentLink = () => {
  return useContext(PaymentLinkContext);
};
