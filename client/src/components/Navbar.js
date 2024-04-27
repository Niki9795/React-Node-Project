import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';

function Navbar() {
    return (
        <div className='nav-bar'>
            <ul className='nav-ul'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;