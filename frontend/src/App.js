// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './components/Admin/AdminLogin';
import TenantLogin from './components/Tenant/TenantLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import TenantDashboard from './components/Tenant/TenantDashboard';
import './index.css';
 
const App = () => {
    return (
        <Router>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/tenant/login" element={<TenantLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/tenant/:tenantId/vehicles" element={<TenantDashboard />} />
              </Routes>
            </div>
        </Router>
    );
};

export default App;