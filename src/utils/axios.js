import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, withCredentials: true, headers: {
        Accept: "application/json"
    }
})

axios.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response?.data) || "Something went wrong")
)

export default axiosInstance;
