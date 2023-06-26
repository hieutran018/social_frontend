import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../auth/auth";
import Loading from "../loading/Loading";

function ProtectedRoutes({ children }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [isLoggedIn, setIsLoggedIn] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        baseURL.post('/api/auth/me', {}, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((res) => setIsLoggedIn(true)).catch((err) => { console.log(err.message); setIsLoggedIn(false); navigate('/login') });
    }, [cookies])

    if (isLoggedIn) {
        return children;
    }
    return (
        <Loading />
    );



}

export default ProtectedRoutes;