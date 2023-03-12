import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Auth() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }

    // const getUser = () => {
    //     const userString = sessionStorage.getItem('user');
    //     const userDetial = JSON.parse(userString);
    //     return userDetial
    // }

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/');
    }

    const saveAsToken = (user, token) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);
        setToken(token);
        setUser(user);
        setTimeout(function () {
            navigate('/');
        }, 4000);

    }

    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api/auth",
        headers: { "Content-Type": "application/json" },
    });
    return {
        setToken: saveToken,
        resetToken: saveAsToken,
        token,
        user,
        getToken,
        http,
    }
}

export default Auth;