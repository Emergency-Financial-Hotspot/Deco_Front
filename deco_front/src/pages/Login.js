import React, { useState } from 'react';
import { auth, provider } from '../firebaseConfig'; // Adjust path as necessary
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; // Google Icon
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional: Create a CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Signed in as:', user.displayName);
            
            // Store user info in local storage
            localStorage.setItem('user', JSON.stringify(user));
            
            // Redirect user after successful login
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Google Sign-In Error:', error.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p className="error-message">{error}</p>}
            <Button className="google-btn" onClick={handleGoogleSignIn}>
                <FcGoogle size={20} /> Continue with Google
            </Button>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
