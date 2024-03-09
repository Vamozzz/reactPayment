import SkeletonColor from "../components/skeleton";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

type ContextData = {
  invoiceData: {
    payable_amount: string;
    customerName: string;
    customerMobile: string;
    invoiceId: string;
    merchant_logo: string;
    merchant_name_logo: string;
    template_id: number;
    order_id: string;
    transaction_id: string;
    settlement_time: string;
    txn_status: string;
    vendor_name: string;
    vendor_email: string;
    vendor_number: string;
    bg_color?: string;
  } | null;
  loading: boolean;
};

export const FirstModuleContext = createContext<ContextData>({
  invoiceData: null,
  loading: true,
});

type FirstModuleProviderProps = {
  children: ReactNode;
};

export const FirstModuleProvider: React.FC<FirstModuleProviderProps> = ({
  children,
}) => {
  const [invoiceData, setInvoiceData] =
    useState<ContextData["invoiceData"]>(null);
  const [loading, setLoading] = useState(true);
  const urlParams = window.location.pathname;
  const urlParamsString = urlParams?.split("/");
  const invoiceId = urlParamsString?.[urlParamsString.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      // const urlParams = "https://vampay.in/Merchant/pin/ba4gMu";
      // const urlParamsString = urlParams.split("/");
      try {
        const response = await fetch(
          "https://api.vampay.in/Merchent/merchantCreateInvoice",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              invoice_id: invoiceId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed Error fetching Invoice");
        }

        const data = await response.json();
        setInvoiceData(data.data);
        if (data.data.error_message) {
          alert("Incorrect Url");
          throw new Error("Incorrect Url");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("urlParams", urlParams);
  console.log(loading, "==>loading");

  return (
    <FirstModuleContext.Provider value={{ invoiceData, loading }}>
      {loading && <SkeletonColor />}
      {!loading && children}
      {/* {error && <div>{error}</div>} */}
    </FirstModuleContext.Provider>
  );
};

export const useFirstModule = () => {
  return useContext(FirstModuleContext);
};
