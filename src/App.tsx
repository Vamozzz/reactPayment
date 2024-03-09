import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RouteComponent from "./routeComponent";
import NotFoundPage from "./components/notfound";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="*" element={<NotFoundPage />} />
        <Route path="/:dynamicData" element={<RouteComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
