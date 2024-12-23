import React, { useEffect, useState } from 'react';
import { getAllTenants, createTenant, updateTenant, deleteTenant } from '../../Api/api.js';
import '../../index.css';

const AdminDashboard = () => {
    const [tenants, setTenants] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedTenant, setSelectedTenant] = useState(null);

    const fetchTenants = async () => {
        const response = await getAllTenants();
        setTenants(response.data);
    };

    const handleCreateTenant = async (e) => {
        e.preventDefault();
        await createTenant({ name, email, password: 'defaultPassword' });
        fetchTenants();
        setName('');
        setEmail('');
    };

    const handleUpdateTenant = async (e) => {
        e.preventDefault();
        if (selectedTenant) {
            await updateTenant(selectedTenant.id, { name, email });
            fetchTenants();
            setSelectedTenant(null);
            setName('');
            setEmail('');
        }
    };

    const handleDeleteTenant = async (id) => {
        await deleteTenant(id);
        fetchTenants();
    };

    const handleEditTenant = (tenant) => {
        setSelectedTenant(tenant);
        setName(tenant.name);
        setEmail(tenant.email);
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    return (
        <div className="tenant-dashboard">
            <h2>Tenant Dashboard</h2>
            <form className="tenant-form" onSubmit={selectedTenant ? handleUpdateTenant : handleCreateTenant}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">{selectedTenant ? 'Update Tenant' : 'Create Tenant'}</button>
            </form>
            <ul className="tenant-form">
                {tenants.map(tenant => (
                    <li key={tenant.id}>
                        {tenant.name} - {tenant.email}
                        <button onClick={() => handleEditTenant(tenant)}>Edit</button>
                        <button onClick={() => handleDeleteTenant(tenant.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;