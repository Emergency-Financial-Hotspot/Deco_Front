import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Playground from "../pages/Playground";
import Dashboard from "../pages/Dashboard";
import PlaygroundNavbar from "./PlaygroundNavbar";
import { UserProvider } from "./UserContext";

import "./App.css";

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    localStorage.getItem("token") ? navigate("/playground") : setShowModal(true);
  };

  return (
    <div className="home-container">
      <h1>Welcome to <span className="brand-name">DeCo</span></h1>
      <p>Real-time AI assistance and code analysis coming soon!</p>
      <Button variant="primary" onClick={handleGetStarted} className="get-started-btn">
        Get Started
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="small-modal">
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please <a href="/login">login</a> or <a href="/register">register</a> first.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const App = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
      {location.pathname === "/" && <PlaygroundNavbar onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

const Root = () => (
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);

export default Root;
