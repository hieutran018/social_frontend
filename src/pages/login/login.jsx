import { Link } from 'react-router-dom'
import './login.css';

function Login() {
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
                    <input placeholder="Email" className="loginInput" />
                    <input placeholder="Password" className="loginInput" />
                    <Link to="/" className="loginButton">Đăng nhập</Link>
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