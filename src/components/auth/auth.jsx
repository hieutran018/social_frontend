import axios from 'axios';

export const requestDev = axios.create({
    //* Base Url
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const requestStage = axios.create({
    //* Base Url
    baseURL: 'http://45.117.165.216:8089/api/'
})