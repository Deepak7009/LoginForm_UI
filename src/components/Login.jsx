import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setLoggedIn(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.trim() && !password.trim()) {
            setError('Please enter your email and password.');
        } else if (!email.trim()) {
            setError('Please enter your email.');
        } else if (!password.trim()) {
            setError('Please enter your password.');
        } else {
            localStorage.setItem('isLoggedIn', 'true');
            setLoggedIn(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setLoggedIn(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {loggedIn ? (
                        <Home onLogout={handleLogout} />
                    ) : (
                        <div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
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
                                <div className='text-center mt-2'>
                                    <Button variant="primary" type="submit">
                                        Login
                                        
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
