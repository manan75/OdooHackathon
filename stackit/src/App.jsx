import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import LoginPage from './LoginPage'
import SignupPage from './SignUpPage';
import AdminLoginPage from './AdminLogin';
import LandingPage from './LandingPage'
import TempHome from './TempHome';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route
          path="/"
          element={<LandingPage/>
          }
        />
        <Route path="/home" element={<TempHome/>}/>
      </Routes>
    </Router>
  )
}

export default App
