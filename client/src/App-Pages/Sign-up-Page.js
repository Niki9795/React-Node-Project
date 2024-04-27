import React, { useState } from "react";
import '../css/signin-signup-page.css';
import { useNavigate } from "react-router-dom";

function SignUpPage() {

    const navigate = useNavigate(); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleGoToSignIn = () => {
        navigate('/signin');
    };


    const handleSignIn = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } else if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        } 

        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (response.ok) {
            navigate('/');
        } else if (response.status === 409) {
            alert('User already exists');
        } else {
            console.error('Failed to sign up');
        }
    };

    return (
        <div className="container">
            <div>
                <div>
                    <h1>Sign up</h1>
                    <input className="inputBox" type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input className="inputBox" type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <input className="inputBox" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input className="inputBox" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input className="inputBox" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    <button className="appButton" onClick={handleSignIn}>Sign up</button>
                </div>
                <dv>
                    <hr />
                </dv>
            </div>
            <div>
                <a className="no-account-link">Already signed up?</a>
                <button className="signin-signup-btn" onClick={handleGoToSignIn}>Go to login</button>
            </div>
        </div>
    )
}

export default SignUpPage;