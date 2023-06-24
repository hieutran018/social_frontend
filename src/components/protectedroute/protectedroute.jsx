import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { requestDev, requestStage } from "../auth/auth";
import Loading from "../loading/Loading";
function ProtectedRoutes({ children }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [isLoggedIn, setIsLoggedIn] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        requestStage.post('/auth/me', {}, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((res) => setIsLoggedIn(true)).catch((err) => { console.log(err.message); setIsLoggedIn(false); navigate('/login') });
        // axios({
        //     method: 'POST', //you can set what request you want to be
        //     url: 'https://ckcsocial.site/api/auth/me',
        // })
    }, [cookies])

    if (isLoggedIn) {
        return children;
    }
    return (
        <Loading />
    );



}

export default ProtectedRoutes;