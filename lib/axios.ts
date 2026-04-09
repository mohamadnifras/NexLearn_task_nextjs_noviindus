import axios from "axios";
import Cookies from "js-cookie";


const BASE_URL = "https://nexlearn.noviindusdemosites.in"
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("access_token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized. Maybe redirect to login?");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;