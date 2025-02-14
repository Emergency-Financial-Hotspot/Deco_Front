import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { auth, provider, createUserWithEmailAndPassword } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth"; // ✅ Import directly from firebase/auth
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // ✅ Now this works!
      console.log("Signed up with Google:", result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Signup Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}

      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="register-btn" type="submit">
          Register
        </Button>
      </Form>

      <div className="google-signup">
        <Button className="google-btn" onClick={handleGoogleSignUp}>
          <FcGoogle size={20} /> Continue with Google
        </Button>
      </div>

      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
