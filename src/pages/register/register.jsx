import { Link } from 'react-router-dom';
import './register.css';

function Register() {
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

                    <input placeholder="Tên hiển thị" className="loginInput" />
                    <input placeholder="Email" className="loginInput" />
                    <input placeholder="Mật khẩu" className="loginInput" />
                    <input placeholder="Xác nhận mật khẩu" className="loginInput" />
                    <button className="loginButton">Đăng ký</button>

                    <Link to="/login" className="loginRegisterButton">
                        Đã có tải khoản, đăng nhập ngay
                    </Link>

                </div>
            </div>
        </div>
    </div>);
}

export default Register;