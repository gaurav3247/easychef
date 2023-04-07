import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("user_tokens");
        if (token) {
            var access_token =  token.access
            config.headers['Authorization'] = 'Bearer ' + access_token;
        }
        
        return config
    },
    error => {
        Promise.reject(error)
    }
)