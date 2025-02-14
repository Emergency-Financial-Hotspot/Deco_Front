import React, { useState, useEffect } from "react";
import { default as MonacoEditor } from "react-monaco-editor";
import { Button, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import io from "socket.io-client"; // WebSockets for real-time collaboration
import "./App.css";
import { FaMoon, FaSun } from 'react-icons/fa';

const socket = io("http://localhost:5000"); // Backend WebSocket server

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button variant="secondary" onClick={toggleTheme} className="m-2">
      {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </Button>
  );
}

function Home() {
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleGetStartedClick = () => {
    if (!localStorage.getItem("user")) {
      setShowLoginMessage(true);
    } else {
      setShowNotification(true);
      setTimeout(() => {
        navigate("/playground");
      }, 2000);
    }
  };

  const handleClose = () => setShowLoginMessage(false);
  const handleNotificationClose = () => setShowNotification(false);

  return (
    <div className="App-footer">
      <h1>Interactive Code Playground</h1>
      <p>Real-time AI assistance and code analysis coming soon!</p>
      <Button variant="primary" onClick={handleGetStartedClick}>Get Started</Button>
      <Modal show={showLoginMessage} onHide={handleClose} centered className="small-modal">
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please <a href="/login">login</a> or <a href="/register">register</a> first.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNotification} onHide={handleNotificationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are being redirected to the playground...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNotificationClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function Playground() {
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("");
  const editorOptions = {
    selectOnLineNumbers: true,
    theme: "vs-dark",
  };

  useEffect(() => {
    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });
  }, []);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    socket.emit("codeUpdate", newValue); // Send code updates in real-time
  };

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/run", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error executing code.");
    }
  };

  return (
    <div className="app">
      <h1>Interactive Code Playground</h1>
      <MonacoEditor
        height="70vh"
        language="javascript"
        value={code}
        options={editorOptions}
        onChange={handleEditorChange}
      />
      <Button variant="success" onClick={handleRunCode} className="mt-2">Run Code</Button>
      <div className="output-panel">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

function App() {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to DeCo</h1>
          <ThemeToggle />
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
