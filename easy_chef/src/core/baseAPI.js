import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("user_tokens");
        if (token) {
            var access_token =  JSON.parse(token)["access"]
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }

        return config
    },
    error => {
        Promise.reject(error)
    }
    )

export default api;