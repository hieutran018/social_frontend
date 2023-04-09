import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './forgetpassword.css';

function ConfirmForgotPassword() {


    const [tokenString, setTokenString] = useState();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const submitTokenString = () => {
        setIsLoading(true);
        setMessage('Mật khẩu được đặt lại đang được xác nhận!')
        const requestURL = 'http://127.0.0.1:8000/api/auth/completed-forgot-password';
        axios.post(requestURL, {
            tokenReset: tokenString,
        }).then((res) => {
            setMessage('Mật khẩu mới đã được gửi đến địa chỉ email của bạn!')
            setIsLoading(true);
        }).catch((err) => { setMessage('Mã xác nhận không đúng'); setIsLoading(false); });
    }

    return (

        <div className="forgetPassword">
            <div className="forgetPasswordWrapper">
                <div className="forgetPasswordLeft">
                    <h3 className="forgetPasswordLogo">CKCS</h3>
                    <span className="forgetPasswordDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên CKCS.
                    </span>
                </div>
                <div className="forgetPasswordRight">
                    <div className="forgetPasswordBox">
                        <span className='forgetPasswordTextDescription'>Mã xác nhận đã được gửi đi, vui lòng chờ trong ít phút!</span>
                        <span style={{ fontSize: "18px", display: "flex", justifyContent: "center" }}>{message && message}</span>
                        <input placeholder="Mã xác nhận" className="forgetPasswordInput" value={tokenString} onChange={(event) => { setTokenString(event.target.value); setIsLoading(false); }} />
                        <button onClick={submitTokenString} style={{ backgroundColor: isLoading ? 'gray' : '' }} disabled={isLoading} className="forgetSendRessetPasswordButton">Xác nhận</button>


                        <Link to="/login" className="forgetPasswordButton">
                            Quay lại đăng nhập
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default ConfirmForgotPassword;