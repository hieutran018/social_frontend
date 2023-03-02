import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import './register.css';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        axios.post('http://127.0.0.1:8000/api/auth/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (<div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">CKCS</h3>
                <span className="registerDesc">
                    Kết nối với bạn bè và thế giới xung quanh bạn trên CKCS.
                </span>
            </div>
            <div className="registerRight">
                <div className="registerBox">

                    <input placeholder="Họ" className="registerInput" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    <span className='textError'>Họ không được bỏ trống!</span>
                    <input placeholder="Tên" className="registerInput" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    <span className='textError'>Họ không được bỏ trống!</span>
                    <input placeholder="Email" className="registerInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <span className='textError'>Họ không được bỏ trống!</span>
                    <input placeholder="Mật khẩu" className="registerInput" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <span className='textError'>Họ không được bỏ trống!</span>
                    <input placeholder="Xác nhận mật khẩu" className="registerInput" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                    <span className='textError'>Họ không được bỏ trống!</span>
                    <button onClick={handleFormSubmit} className="submitRegisterButton">Đăng ký</button>

                    <Link to="/login" className="registerButton">
                        Đã có tải khoản, đăng nhập ngay
                    </Link>

                </div>
            </div>
        </div>
    </div>);
}

export default Register;