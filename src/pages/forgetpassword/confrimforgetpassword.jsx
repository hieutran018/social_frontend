import { useState } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgetpassword.css';
import { baseURL } from '../../components/auth/auth';

function ConfirmForgotPassword() {


    const [tokenString, setTokenString] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
    const notiInfo = (textInfo) => {
        toast.info(textInfo, {
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


    const handleChangeTokenString = (event) => {
        setTokenString(event.target.value);
    }
    const validate = () => {
        if (isEmpty(tokenString)) {
            noti('Mã xác nhận không được phép bỏ trống!')
            return false;
        }

        return true;
    }
    const submitTokenString = () => {
        const isValid = validate();
        if (!isValid) {
            return;
        } else {
            setIsLoading(true);
            // const requestURL = 'https://ckcsocial.site/api/auth/completed-forgot-password';
            baseURL.post('/api/auth/completed-forgot-password', {
                tokenReset: tokenString
            }, {}).then((res) => {
                notiInfo('Mật khẩu mới đã được gửi đến địa chỉ email của bạn!')
                setIsLoading(false);
            }).catch((err) => { noti('Mã xác nhận không đúng'); setIsLoading(false); });
        }
    }

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
                        <div className='forgetPasswordTextDescriptionContainer'>
                            <span className='forgetPasswordTextDescription'>Mã xác nhận đã được gửi đến email của bạn, vui lòng chờ giây lát!</span>
                        </div>
                        <input placeholder="Mã xác nhận" className="forgetPasswordInput" value={tokenString} onChange={handleChangeTokenString} />
                        <button onClick={submitTokenString} style={{ backgroundColor: isLoading ? 'gray' : '' }} disabled={isLoading} className="forgetSendRessetPasswordButton">{isLoading ? 'Đang xác minh' : 'Xác nhận'}</button>
                        <Link to="/login" className="forgetPasswordButton">
                            Quay lại đăng nhập
                        </Link>

                    </div>
                </div>
            </div>
            <ToastContainer
                style={{ borderRadius: "5px", maxwidth: "500px" }}
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

export default ConfirmForgotPassword;