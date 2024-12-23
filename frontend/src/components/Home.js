import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin/login'); 
    };

    const handleTenantLogin = () => {
        navigate('/tenant/login'); 
    };

    return (
        <div className="home-container">
            <h2>Welcome to Multi-Tenant Vehicle Management System</h2>
            <div className="login-container" onClick={handleAdminLogin}>
                <img src="/avatar.jpg" alt="Admin Avatar" className="avatar" />
                <h2>Admin Login</h2>
            </div>
            <div className="login-container" onClick={handleTenantLogin}>
                <img src="/avatar.jpg" alt="Tenant Avatar" className="avatar" />
                <h2>Tenant Login</h2>
            </div>
        </div>
    );
};

export default Home;