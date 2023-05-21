import './login.css';
import logo from '../../../ckc_logo-text.png';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
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
                    <input className='adminLoginFormInput' placeholder='Email' type="text" />
                    <input className='adminLoginFormInput' placeholder='Mật khẩu' type="password" />
                    <button onClick={() => navigate('/admin/dashboard')} className='adminLoginButtonSubmit'>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;