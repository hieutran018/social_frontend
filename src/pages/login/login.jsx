import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../components/auth/auth';
import Loading from '../../components/loading/Loading';
import './login.css';

function Login() {
    const { http, setToken, resetToken } = Auth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [tokenString, setTokenString] = useState();
    const [userString, setUserString] = useState();
    const [isSuccess, setIsSuccess] = useState(true);
    const submitFormLLogin = () => {
        setIsSuccess(false);
        http.post('/login', { email: email, password: password }).then((response) => {
            setToken(response.data.user, response.data.access_token)
            setIsSuccess(true);
        });
    }
    useEffect(() => {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
            setIsSuccess(false);
            setTokenString(sessionStorage.getItem('token'));
            setUserString(sessionStorage.getItem('user'));
            resetToken(sessionStorage.getItem('user'), sessionStorage.getItem('token'));
        }
    }, [tokenString, userString, isSuccess, resetToken]);


    return (
        isSuccess ?
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
                            <input placeholder="Password" className="loginInput" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <button onClick={submitFormLLogin} className="loginButton">Đăng nhập</button>
                            <span className="loginForgot">Quên mật khẩu?</span>

                            <Link to="/registration" className="loginRegisterButton">
                                Tạo một tài khoản mới
                            </Link>

                        </div>
                    </div>
                </div>
            </div> : <Loading />

    );
}

export default Login;