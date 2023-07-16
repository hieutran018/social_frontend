import './login.css';
import logo from '../../../ckc_logo-text.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import isEmpty from 'validator/lib/isEmpty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['tk']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);

    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
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

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const validate = () => {
        if (isEmpty(email) || isEmpty(password)) {
            noti('Email và mật khẩu không được bỏ trống')
            return false;
        }
        if (!isValidEmail(email)) {
            noti('Email không hợp lệ!');
            return false;
        }

        return true;
    }


    const login = () => {
        const isValid = validate();

        if (!isValid) {
            return;
        } else {
            try {
                axios.post('https://ckcsocial.site/api/auth/admin/login', {
                    email: email,
                    password: password,
                }).then((res) => {
                    console.log(res.data);
                    if (!res.statusText === 'OK') {
                        return;
                    } else {
                        if (parseInt(res.data.role) === 1) {
                            setCookie('tk', res.data.access_token, { path: '/admin', maxAge: res.data.expires_in })
                            localStorage.setItem('adminInfo', JSON.stringify(res.data.user));
                            navigate('/admin/dashboard');
                        } else {
                            noti('Bạn không có quyền truy cập vào trang này!');
                        }

                    }
                }).catch((error) => { console.log(error.response.data.error); noti(error.response.data.error); });
            } catch (error) {
                console.log(error, '1');
            }
        }


    }
    return (
        <div className='adminLogin'>
            <div className='adminLoginWrapper'>
                <div className='adminLoginForm'>
                    <div className='adminLoginLogo'>
                        <img className='adminLoginLogoApp' src={logo} alt="" />
                    </div>
                    <div className='adminLoginDescription'>
                        <h2>Xin chào!</h2>
                        <span>Hãy đăng nhập để tiếp tục.</span>
                    </div>
                    <input className='adminLoginFormInput' onChange={handleChangeEmail} placeholder='Email' type="text" />
                    <input className='adminLoginFormInput' onChange={handleChangePassword} placeholder='Mật khẩu' type="password" />
                    <button onClick={login} className='adminLoginButtonSubmit'>
                        Đăng nhập
                    </button>
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

export default AdminLogin;