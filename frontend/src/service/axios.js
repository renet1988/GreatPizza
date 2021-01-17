import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    params: {},
    data: {},
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default instance;