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
                    <button className="loginButton">Đăng nhập</button>
                    <span className="loginForgot">Quên mật khẩu?</span>
                    <button className="loginRegisterButton">
                        Tạo một tài khoản mới
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default Login;