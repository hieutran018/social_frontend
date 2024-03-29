import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';
import { baseURL } from '../../components/auth/auth';

function Register() {
    const [displayName, setdisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const validtate = () => {
        if (isEmpty(displayName)) {
            noti('Họ tên không được phép bỏ trống!');
            return false;
        }
        if (isEmpty(email)) {
            noti('Email không được phép bỏ trống');
            return false;
        } else if (!isValidEmail(email)) {
            noti('Định dạng email không hợp lệ!');
            return false;
        }
        if (isEmpty(password)) {
            noti('Mật khẩu không được phép bỏ trống!');
            return false;
        }
        if (password !== confirmPassword) {
            noti('Xác nhận mật khẩu và mật khẩu không khớp!');
            return false;
        }
        return true;


    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const isValid = validtate();

        if (!isValid) {
            return
        } else {
            try {
                baseURL.post('/api/auth/register', {
                    displayName: displayName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response.data);
                    noti('Đăng ký thành công, vui lòng kiểm tra hộp thư email của bạn để xác nhận đăng ký tài khoản');
                })
                    .catch((error) => {
                        if (JSON.parse(error.response.data).email) {
                            console.log("ERROR", JSON.parse(error.response.data).email[0]);
                            noti(JSON.parse(error.response.data).email[0]);
                        }
                        if (JSON.parse(error.response.data).password) {
                            noti(JSON.parse(error.response.data).password[0]);
                        }
                    }

                    );
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">CKCS</h3>
                    <span className="registerDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên CKCS.
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerTop">
                        <h3 className="registerLogo">CKCS</h3>
                    </div>
                    <div className="registerBox">

                        <input placeholder="Tên hiển thị" className="registerInput" value={displayName} onChange={(event) => setdisplayName(event.target.value)} />

                        <input placeholder="Email" className="registerInput" value={email} onChange={(event) => { setEmail(event.target.value); }} />

                        <input placeholder="Mật khẩu" type={"password"} className="registerInput" onChange={handleChangePassword} />

                        <input placeholder="Xác nhận mật khẩu" type={"password"} className="registerInput" onChange={handleChangeConfirmPassword} />

                        <button onClick={handleFormSubmit} className="submitRegisterButton">Đăng ký</button>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to="/login" className="registerButton">
                                Đăng nhập ngay
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer
                style={{ borderRadius: "5px", width: "350px" }}
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

export default Register;