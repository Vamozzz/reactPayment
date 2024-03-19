import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RouteComponent from "./routeComponent";
import NotFoundPage from "./components/notfound";
import InvoiceDataPage from "./firstModule/invoiceData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:dynamicData" element={<RouteComponent />} />
        <Route path="/invoice/:dynamicData" element={<InvoiceDataPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
