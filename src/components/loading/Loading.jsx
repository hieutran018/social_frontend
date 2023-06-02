import "./loading.css";
import logo from '../../ckc_social_logo.png';

function Loading() {
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