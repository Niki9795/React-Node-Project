import React, { useState } from "react";
import '../css/signin-signup-page.css';
import { useNavigate } from "react-router-dom";

function SignInPage() {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        navigate('/signup'); 
    };

    const handleSignIn = async () => {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    
        if (response.headers.get('Content-Type').includes('application/json')) {
            const data = await response.json();
    
            if (data.success) {
                navigate('/');
            } else {
                alert(data.message)
            }
        } else {
            const message = await response.text();
            alert(message);
        }
    };


    return (
        <div className="container">
            <div>
                <div>
                    <h1>Log in</h1>
                    <input className="inputBox" type="email" placeholder="Enter your email" />
                    <input className="inputBox" type="password" placeholder="Enter your password" />
                    <button className="appButton" onClick={handleSignIn}>Sign In</button>
                </div>
                <dv>
                    <a className="forgot-link" href="#">Forgot your password?</a>
                    <hr />
                </dv>
            </div>
            <div>
                <a className="no-account-link">Don't have an account?</a>
                <button className="signin-signup-btn" onClick={handleSignUp}>Sign up</button>
            </div>
        </div>
    )
}

export default SignInPage;