import React from "react";
import '../css/signin-signup-page.css';
import { useNavigate } from "react-router-dom";

function SignInPage() {

    const navigate = useNavigate(); 

    const handleSignUp = () => {
        navigate('/signup'); 
    };


    return (
        <div className="container">
            <div>
                <div>
                    <h1>Log in</h1>
                    <input className="inputBox" type="email" placeholder="Enter your email" />
                    <input className="inputBox" type="password" placeholder="Enter your password" />
                    <button className="appButton">Sign In</button>
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