import React, { useState } from 'react';
import { tenantLogin } from '../../Api/api.js';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../index.css';

const TenantLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await tenantLogin({ email, password });
            localStorage.setItem('tenantToken', response.data.token);

            const tenantId = response.data.tenantId; 
            navigate(`/tenant/${tenantId}/vehicles`);
        } catch (error) {
            console.error(error);
            toast.error('Invalid Credentials. Please try again later.');
            
        }
    };

    return (
        <div>
            <form className="tenant-login-form" onSubmit={handleLogin}>
                <h2>Tenant Login</h2>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default TenantLogin;