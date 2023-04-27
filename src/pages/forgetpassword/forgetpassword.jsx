import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import isEmpty from 'validator/lib/isEmpty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgetpassword.css';

function ForgetPassword() {


    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const noti = (textError) => {
        toast.error(textError, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const validate = () => {
        if (isEmpty(email)) {
            noti('Email không được bỏ trống')
            return false;
        } else if (!isValidEmail(email)) {
            noti('Email không hợp lệ!');
            return false;
        }

        return true;
    }

    const submitMailForgotPassword = () => {
        const isValid = validate();
        if (!isValid) {
            return;
        } else {
            const requestURL = 'http://127.0.0.1:8000/api/auth/forgot-password';
            axios.post(requestURL, {
                email: email,
            }).then((res) => {
                navigate('/confirm-forgot-password')
            }).catch((err) => {
                if (err.response.status === 404) {
                    noti('Không tìm thấy địa chỉ email này!')
                }
            });
        }

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
                        <span className='forgetPasswordTextDescription'>Nhập đia chỉ email của tài khoản</span>
                        <input placeholder="Email" className="forgetPasswordInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button onClick={submitMailForgotPassword} disabled={email ? false : true} className={email ? "forgetSendRessetPasswordButton" : "forgetSendRessetPasswordButton disableButton"}>Xác nhận</button>
                        <Link to="/login" className="forgetPasswordButton">
                            Đi đến đăng nhập
                        </Link>

                    </div>
                </div>
            </div>
            <ToastContainer
                style={{ borderRadius: "5px", width: "400px" }}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>


    );
}

export default ForgetPassword;