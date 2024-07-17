import axios from 'axios';

const api = axios.create({
    baseURL: 'https://easychef-backend.onrender.com/',
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("user_tokens");
        if (token) {
            let access_token =  JSON.parse(token)["access"]
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
    )

export default api;
