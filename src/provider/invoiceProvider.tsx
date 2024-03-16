import SkeletonColor from "../components/skeleton";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useParams } from "react-router-dom";
import FirstTheme from "../firstModule/firstTheme";

type ContextData = {
  invoiceData: {
    merchnat_id: string;
    merchnat_name: string;
    bg_color: string;
    merchant_logo: string;
    template_id: string | number;
    merchant_email: string;
    merchant_mobile: string;
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
  const { dynamicData } = useParams();
  console.log(dynamicData, "id");

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.vampay.in/Merchent/CommonInvoiceTransaction";
      // const urlParamsString = urlParams.split("/");
      console.log(url,dynamicData)
      try {
        const response = await fetch(
          url,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://vaamoz.com",
            },
            body: JSON.stringify({
              merchnat_id: dynamicData,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("API request failed Error fetching Invoice");
        }

        const data = await response.json();
        console.log(data, "datartyui======>");
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
  }, [dynamicData]);

  // console.log("urlParams", urlParams);
  // console.log(loading, "==>loading");

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
