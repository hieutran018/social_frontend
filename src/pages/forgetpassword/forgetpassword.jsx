import { useState } from 'react';
import { Link } from 'react-router-dom'
import './forgetpassword.css';

function ForgetPassword() {


    const [email, setEmail] = useState();



    return (

        <div className="forgetPassword">
            <div className="forgetPasswordWrapper">
                <div className="forgetPasswordLeft">
                    <h3 className="forgetPasswordLogo">CKCS</h3>
                    <span className="forgetPasswordDesc">
                        Kết nối với bạn bè và thế giới xung quanh bạn trên CKCS.
                    </span>
                </div>
                <div className="forgetPasswordRight">
                    <div className="forgetPasswordBox">
                        <span className='forgetPasswordTextDescription'>Nhập đia chỉ email của tài khoản</span>
                        <input placeholder="Email" className="forgetPasswordInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button className="forgetSendRessetPasswordButton">Xác nhận</button>


                        <Link to="/login" className="forgetPasswordButton">
                            Đi đến đăng nhập
                        </Link>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default ForgetPassword;