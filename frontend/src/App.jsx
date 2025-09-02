import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";
import AboutUs from "./pages/AboutUs";
import Footer from "./pages/Footer";
import LandingPage from "./pages/LandingPage";
import EducationalResourcesPage from "./pages/EducationalResourcePage";
import Detection from "./pages/Detection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<LandingPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route
            path="/EducationalResourcesPage"
            element={<EducationalResourcesPage />}
          />
          <Route path="/Detection" element={<Detection />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
