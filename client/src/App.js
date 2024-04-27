import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignInPage from './App-Pages/Sign-in-Page';
// import AboutPage from './App-Pages/About-Page';
// import ContactPage from './App-Pages/Contact-Page';
import HomePage from './App-Pages/Home-Page';
import SignUpPage from './App-Pages/Sign-up-Page';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;