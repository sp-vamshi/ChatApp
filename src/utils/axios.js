import axios from "axios";

import { BASE_URL } from "../config";

// BASE_URL http://localhost:3001

const axiosInstance = axios.create({ baseURL: BASE_URL, withCredentials: true,headers:{
    Accept:"application/json"}
})

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response?.data) || "Something went wrong")
)

export default axiosInstance;
