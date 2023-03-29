import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Loading from "../loading/Loading";
import axios from "axios";
function ProtectedLogin({ children }) {
    const cookies = useCookies(['_tk']);
    const [isLoggedIn, setIsLoggedIn] = useState();
    useEffect(() => {

        axios({
            method: 'POST', //you can set what request you want to be
            url: 'http://127.0.0.1:8000/api/auth/me',

            headers: {
                Authorization: 'Bearer ' + cookies[0]._tk
            }
        }).then((res) => setIsLoggedIn(true)).catch((err) => { setIsLoggedIn(false) });


    }, [])

    if (isLoggedIn === true) {
        return <Navigate to='/' replace />;
    } else if (isLoggedIn === false) {
        return children;
    }




}

export default ProtectedLogin;