import React, { useState } from 'react';
import { adminLogin } from "../../Api/api.js";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../index.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await adminLogin({ username, password });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');            
        } catch (error) {
            console.error(error);
            toast.error('Invalid Credentials. Please try again later.');
        }
    };

    return (
        <div>
            <form className='admin-login-form' onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>        
    );
};

export default AdminLogin;