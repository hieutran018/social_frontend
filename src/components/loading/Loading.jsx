import "./loading.css";
import logo from '../../ckc_social_logo.png';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Loading() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(function () {
            navigate('/');
        }, 4000);
    })
    return (
        <div>
            <img src={logo} alt="" className="logo-loading" />
            <div className="loading">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div >
    );
}

export default Loading;