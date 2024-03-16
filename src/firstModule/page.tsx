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
  invoiceLink: {
    link: string;
    order_id: string;
    merchant_logo: string;
    invoice_id: string;
    amount: string;
  } | null;
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
  const [payableAmount, setPayableAmount] = React.useState("");

  const updatePaymentLink = (newData: { link?: string; app: string }) => {
    setPaymentLink({
      link: newData.link || "",
      app: newData.app,
    });
  };

  useEffect(() => {
    console.log(payableAmount, invoiceData?.merchnat_id, "payableAmount<<<");
    if (invoiceData && payableAmount) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api.vampay.in/Merchent/CommonInvoiceTransaction",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Origin: "https://vaamoz.com",
              },
              body: JSON.stringify({
                amount: payableAmount,
                merchnat_id: invoiceData?.merchnat_id,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("API request failed");
          }

          const data = await response.json();
          // setThemeData({
          //   link: data?.data?.link,
          //   order_id: data?.data?.order_id,
          //   invoice_id:data?.data?.invoice_id,
          // });
          setThemeData({
            link: data?.data?.link,
            order_id: data?.data?.order_id,
            merchant_logo: data?.data?.merchant_logo,
            invoice_id: data?.data?.invoice_id,
            amount: payableAmount,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [invoiceData, payableAmount]);
  console.log(payableAmount, "wertyuio");

  return (
    <FirstThemeContext.Provider
      value={{ invoiceLink: themeData, loading: !themeData }}
    >
      <PaymentLinkContext.Provider
        value={{ linkData: paymentLink, loading: false, updatePaymentLink }}
      >
        {invoiceData?.template_id === 1 ? (
          <FirstTheme
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
        ) : invoiceData?.template_id === 2 ? (
          <SecondTheme
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
        ) : invoiceData?.template_id === 3 ? (
          <ThirdTheme
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
        ) : (
          <FirstTheme
            payableAmount={payableAmount}
            setPayableAmount={setPayableAmount}
          />
        )}
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
