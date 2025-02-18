import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";
import "./Navbar.css"; // Optional: Import CSS for styling

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply the theme change globally whenever the theme changes
  useEffect(() => {
    console.log("useEffect hook executed"); // Confirm useEffect execution
    document.documentElement.classList.toggle("dark", theme === "dark");
    console.log(`Applied theme class: ${theme === "dark" ? "dark" : "light"}`); // Log the applied theme class
  }, [theme]);

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    console.log("toggleTheme function executed"); // Confirm function execution
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Toggling theme to: ${newTheme}`); // Log the new theme
    setTheme(newTheme); // Update the state
    localStorage.setItem("theme", newTheme); // Save the theme to localStorage
  };

  return (
    <nav className="navbar">
      
      <Button variant="secondary" onClick={toggleTheme} className="m-2">
        {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </Button>
    </nav>
  );
}

export default Navbar;
