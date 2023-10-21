import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./styles/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Router>
        <div className="App">
          <section className="App__list">
            <Routes>
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </section>
        </div>
      </Router>
    </>
  );
};

export default App;
