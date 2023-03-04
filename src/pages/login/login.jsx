import { useState } from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../components/auth/auth';
import './login.css';

function Login() {
    const { http, setToken } = Auth();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const submitFormLLogin = () => {
        http.post('/login', { email: email, password: password }).then((response) => {
            setToken(response.data.user, response.data.access_token)
        });
    }
    return (<div className="login">
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
    </div>);
}

export default Login;