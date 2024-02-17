import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupFirstName, setSignupFirstName] = useState('');
    const [signupLastName, setSignupLastName] = useState('');
    const [signupMobileNumber, setSignupMobileNumber] = useState('');
    const [signupEmail, setSignupEmail] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/login', { username: loginUsername, password: loginPassword });
            const data = response.data;
            if (data.success) {
                alert('Logged in successfully!');
                console.log("USER ID: ", data.userId);
                localStorage.setItem('userId', data.userId); // Store the user ID in localStorage
                navigate('/user'); // Redirect to UserPage
            } else {
                alert('Login failed:', data.message);
            }
        } catch (error) {
            alert('Error: ' + error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/signup', { username: signupUsername, password: signupPassword, first_name: signupFirstName, last_name: signupLastName, mobile: signupMobileNumber, email: signupEmail });
            alert('Signed up successfully!');
        } catch (error) {
            alert('Error: ' + error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label>
                    Username:
                    <input type="text" value={signupUsername} onChange={e => setSignupUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
                </label>
                <label>
                    First Name:
                    <input type="text" value={signupFirstName} onChange={e => setSignupFirstName(e.target.value)} />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={signupLastName} onChange={e => setSignupLastName(e.target.value)} />
                </label>
                <label>
                    Mobile Number:
                    <input type="text" value={signupMobileNumber} onChange={e => setSignupMobileNumber(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="text" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Auth;