import logo from "./logo.svg";
import "./App.css";
import { FirstThemeProvider } from "../src/firstModule/page";
import { FirstModuleProvider } from "../src/provider/invoiceProvider";
function App() {
  return (
    <div className=" bg-[#F1F1F1] lg:w-[500px] m-auto">
      <FirstModuleProvider>
        <FirstThemeProvider />
      </FirstModuleProvider>
    </div>
  );
}

export default App;
