
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import isEmpty from 'validator/lib/isEmpty';
import './login.css';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [validateMsg, setValidateMsg] = useState({});
    const [unAuthorized, setUnAuthorized] = useState();

    const [, setCookie] = useCookies(['_tk']);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validate = () => {
        const msg = {}

        if (!isValidEmail(email)) {
            msg.email = 'Định dạng email không hợp lệ!'
        }
        if (isEmpty(email)) {
            msg.email = 'Email không được bỏ trống!'
        }
        if (isEmpty(password)) {
            msg.password = 'Mật khẩu không được bỏ trống!'
        }
        setValidateMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    }

    const submitFormLLogin = () => {
        const isValid = validate();
        console.log(!isValid)
        if (!isValid) {
            return;
        } else {
            try {
                axios.post('http://127.0.0.1:8000/api/auth/login', {
                    email: email,
                    password: password,
                }).then((res) => {

                    if (!res.statusText === 'OK') {
                        setUnAuthorized('Email hoặc mật khẩu không đúng');
                        return;
                    } else {
                        console.log(res);
                        setCookie('_tk', res.data.access_token, { path: '/', maxAge: res.data.expires_in })
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        navigate('/')
                    }


                }).catch((error) => setUnAuthorized('Email hoặc mật khẩu không đúng'));



            } catch (error) {
                setUnAuthorized('Email hoặc mật khẩu không đúng');
                console.log(error);
            }
        }


    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setValidateMsg({})

    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    // useEffect(() => {
    //     if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
    //         setIsSuccess(false);
    //         setTokenString(sessionStorage.getItem('token'));
    //         setUserString(sessionStorage.getItem('user'));
    //         resetToken(sessionStorage.getItem('user'), sessionStorage.getItem('token'));
    //     }
    // }, [tokenString, userString, isSuccess, resetToken]);

    return (

        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CKCS</h3>
                    <span className="loginDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên CKCS.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <span className='loginErrorMsg'>{unAuthorized && unAuthorized}</span>
                        <input placeholder="Email" className="loginInput" onChange={handleChangeEmail} />
                        <span className='loginErrorMsg'>{validateMsg.email}</span>
                        <input placeholder="Password" type={"password"} className="loginInput" onChange={handleChangePassword} />
                        <span className='loginErrorMsg'>{validateMsg.password}</span>
                        <button onClick={submitFormLLogin} className="loginButton">Đăng nhập</button>
                        <Link className="loginForgot" to="/forget-password"><span className="loginForgot">Quên mật khẩu?</span></Link>

                        <Link to="/registration" className="loginRegisterButton">
                            Tạo một tài khoản mới
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default Login;