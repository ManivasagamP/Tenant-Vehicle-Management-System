import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const adminLogin = (data) => axios.post(`${API_URL}/admin/login`, data);
export const createTenant = (data) => axios.post(`${API_URL}/admin/tenant`, data);
export const getAllTenants = () => axios.get(`${API_URL}/admin/tenant`);
export const updateTenant = (id, data) => axios.put(`${API_URL}/admin/tenant/${id}`, data);
export const deleteTenant = (id) => axios.delete(`${API_URL}/admin/tenant/${id}`);

export const tenantLogin = (data) => axios.post(`${API_URL}/tenant/login`, data);
export const createVehicle = (tenantId, data) => axios.post(`${API_URL}/tenant/${tenantId}/vehicle`, data);
export const getVehicles = (tenantId) => axios.get(`${API_URL}/tenant/${tenantId}/vehicle`);
export const updateVehicle = (tenantId, vehicleId, data) => axios.put(`${API_URL}/tenant/${tenantId}/vehicle/${vehicleId}`, data);
export const deleteVehicle = (tenantId, vehicleId) => axios.delete(`${API_URL}/tenant/${tenantId}/vehicle/${vehicleId}`);