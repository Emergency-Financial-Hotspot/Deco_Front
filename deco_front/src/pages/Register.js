import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { auth, provider, createUserWithEmailAndPassword } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        country: '',
        programmingLanguages: '',
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User registered:", userCredential.user);
            localStorage.setItem("user", JSON.stringify(userCredential.user));
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider); 
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
            <h1>Register</h1>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <h2>Basic Information</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                <h2>Profile Details (Optional)</h2>
                <Form.Group controlId="formBasicFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCountry">
                    <Form.Label>Country/Region</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        placeholder="Country/Region"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicProgrammingLanguages">
                    <Form.Label>Programming Languages Preference</Form.Label>
                    <Form.Control
                        type="text"
                        name="programmingLanguages"
                        placeholder="Programming Languages Preference"
                        value={formData.programmingLanguages}
                        onChange={handleChange}
                    />
                </Form.Group>
                
                <h2>Verification & Security</h2>
                <p>Email Verification and Captcha will be handled here.</p>
                
                <Button className="register-btn" type="submit">
                    Register
                </Button>
            </Form>
            <Button className="google-btn" onClick={handleGoogleSignIn}>
                <FcGoogle size={20} /> Continue with Google
            </Button>
        </div>
    );
};

export default Register;
