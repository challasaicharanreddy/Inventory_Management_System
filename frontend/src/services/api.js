import axios from "axios";

const api = axios.create({
    baseURL: "https://inventory-management-system-emet.onrender.com/api/v1",
    withCredentials: true,
});

export default api;