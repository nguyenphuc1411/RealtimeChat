import axios from "axios";
import { BaseUrl } from "./BaseUrl";
const instance = axios.create({
    baseURL: `${BaseUrl}api/`
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;