
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import './login.css';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [, setCookie] = useCookies(['_tk']);
    const submitFormLLogin = () => {
        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: email,
            password: password,
        }).then((res) => {

            setCookie('_tk', res.data.access_token, { path: '/', maxAge: res.data.expires_in })
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/')

        }).catch((error) => alert(error));



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
                        <input placeholder="Email" className="loginInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input placeholder="Password" type={"password"} className="loginInput" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <button onClick={submitFormLLogin} className="loginButton">Đăng nhập</button>
                        <span className="loginForgot">Quên mật khẩu?</span>

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