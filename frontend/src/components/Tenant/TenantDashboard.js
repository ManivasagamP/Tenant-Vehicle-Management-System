import React, { useEffect, useState } from 'react';
import { createVehicle, getVehicles, updateVehicle, deleteVehicle } from '../../Api/api.js';
import '../../index.css';
import { useParams } from 'react-router-dom';

const VehicleDashboard = () => {
    const { tenantId } = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [pricePerKm, setPricePerKm] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const fetchVehicles = async () => {
        const response = await getVehicles(tenantId);
        setVehicles(response.data);
    };

    const handleCreateVehicle = async (e) => {
        e.preventDefault();

        if (!tenantId) {
            console.error("Tenant ID is not defined");
            return;
        }

        try {
            await createVehicle(tenantId, { name, type, pricePerKm });           
            fetchVehicles();
            
            setName('');
            setType('');
            setPricePerKm('');
        } catch (error) {
            console.error("Error creating vehicle:", error);
        }
    };

    const handleUpdateVehicle = async (e) => {
        e.preventDefault();
        if (selectedVehicle) {
            await updateVehicle(tenantId, selectedVehicle.id, { name, type, price_per_km: pricePerKm });
            fetchVehicles();
            setSelectedVehicle(null);
            setName('');
            setType('');
            setPricePerKm('');
        }
    };

    const handleDeleteVehicle = async (id) => {
        await deleteVehicle(tenantId, id);
        fetchVehicles();
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setName(vehicle.name);
        setType(vehicle.type);
        setPricePerKm(vehicle.price_per_km);
    };

    useEffect(() => {
        fetchVehicles();
        // eslint-disable-next-line
    }, [tenantId]);

    return (
        <div className="vehicle-dashboard">
            <h2>Tenant Dashboard</h2>
            <form onSubmit={selectedVehicle ? handleUpdateVehicle : handleCreateVehicle}>
                <input type="text" placeholder="Vehicle Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Vehicle Type" value={type} onChange={(e) => setType(e.target.value)} required />
                <input type="number" placeholder="Price per Km" value={pricePerKm} onChange={(e) => setPricePerKm(e.target.value)} required />
                <button type="submit">{selectedVehicle ? 'Update Vehicle' : 'Create Vehicle'}</button>
            </form>
            <ul className="vehicle-dashboard">
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        {vehicle.name} - {vehicle.type} - ${vehicle.price_per_km} per Km
                        <button onClick={() => handleEditVehicle(vehicle)}>Edit</button>
                        <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleDashboard;