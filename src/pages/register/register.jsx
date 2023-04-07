import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import isEmpty from 'validator/lib/isEmpty';
import './register.css';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validateMsg, setValidateMsg] = useState({});
    const [useEmail, setUseEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validtate = () => {
        const msg = {}
        if (!isValidEmail(email)) {
            msg.email = 'Định dạng email không hợp lệ!'
        }
        if (isEmpty(email)) {
            msg.email = 'Email không được bỏ trống!'
        }
        if (isEmpty(firstName)) {
            msg.firstName = 'Họ tên không được bỏ trống!'
        }
        if (isEmpty(lastName)) {
            msg.lastName = 'Tên không được bỏ trống!'
        }
        if (isEmpty(password)) {
            msg.password = 'Mật khẩu không được bỏ trống!'
        }
        if (isEmpty(confirmPassword)) {
            msg.confirmPassword = 'Mật khẩu không được bỏ trống!'
        }
        if (password !== confirmPassword) {
            msg.confirmPassword = 'Xác nhận mật khẩu và mật khẩu không khớp!'
        }

        setValidateMsg(msg);
        if (Object.keys(msg).length > 0) {
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
                    .then((response) => {
                        console.log(response.data);

                    })
                    .catch((error) => {
                        if (JSON.parse(error.response.data).email) {
                            console.log("ERROR", JSON.parse(error.response.data).email[0]);
                            setUseEmail(JSON.parse(error.response.data).email[0]);
                        }
                        if (JSON.parse(error.response.data).password) {
                            setErrorPassword(JSON.parse(error.response.data).password[0]);
                        }


                    }

                    );
            } catch (error) {
                console.log(error);
            }
        }
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
                    <span className='textError'>{validateMsg.firstName}</span>
                    <input placeholder="Tên" className="registerInput" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                    <span className='textError'>{validateMsg.lastName}</span>
                    <input placeholder="Email" className="registerInput" value={email} onChange={(event) => { setEmail(event.target.value); setUseEmail('') }} />
                    <span className='textError'>{validateMsg.email}</span>
                    <span className='textError'>{useEmail && useEmail}</span>
                    <input placeholder="Mật khẩu" className="registerInput" value={password} onChange={(event) => { setPassword(event.target.value); setErrorPassword('') }} />
                    <span className='textError'>{validateMsg.password}</span>
                    <span className='textError'>{errorPassword && errorPassword}</span>
                    <input placeholder="Xác nhận mật khẩu" className="registerInput" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                    <span className='textError'>{validateMsg.confirmPassword}</span>
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