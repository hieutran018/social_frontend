import axios from 'axios';

export const baseURL = axios.create({
    //* Base Url https://ckcsocial.site
    baseURL: 'http://127.0.0.1:8000'
})