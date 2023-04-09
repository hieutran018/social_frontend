import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './forgetpassword.css';

function ForgetPassword() {


    const [email, setEmail] = useState();
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const submitMailForgotPassword = () => {
        const requestURL = 'http://127.0.0.1:8000/api/auth/forgot-password';
        axios.post(requestURL, {
            email: email,
        }).then((res) => {
            navigate('/confirm-forgot-password')
        }).catch((err) => {
            if (err.response.status == 404) {
                setError('Không tìm thấy địa chỉ email này!')
            }
        });
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
                        <span style={{ fontSize: "18px", color: "red", display: "flex", justifyContent: "center" }}>{error && error}</span>
                        <span className='forgetPasswordTextDescription'>Nhập đia chỉ email của tài khoản</span>
                        <input placeholder="Email" className="forgetPasswordInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button onClick={submitMailForgotPassword} className="forgetSendRessetPasswordButton">Xác nhận</button>


                        <Link to="/login" className="forgetPasswordButton">
                            Đi đến đăng nhập
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default ForgetPassword;