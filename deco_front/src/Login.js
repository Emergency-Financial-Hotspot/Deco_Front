import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      
      // Store user info in local storage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Redirect user after successful login
      window.location.href = "/playground"; 
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>

      {/* Google Login Button */}
      <Button className="google-btn" onClick={handleGoogleSignIn}>
        <FcGoogle size={20} /> Continue with Google
      </Button>

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
