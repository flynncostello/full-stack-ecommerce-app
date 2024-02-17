import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from '../src/components/Auth';
import UserPage from '../src/components/UserPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </Router>
  )
};
