
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import isEmpty from 'validator/lib/isEmpty';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseconfig';
import { signInWithPopup } from "firebase/auth";
import { requestDev } from '../../components/auth/auth';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [, setCookie] = useCookies(['_tk']);

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
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

    const validate = () => {
        if (isEmpty(email) || isEmpty(password)) {
            noti('Email và mật khẩu không được bỏ trống')
            return false;
        }
        if (!isValidEmail(email)) {
            noti('Email không hợp lệ!');
            return false;
        }

        return true;
    }

    const submitFormLLogin = () => {
        const isValid = validate();

        if (!isValid) {
            return;
        } else {
            try {
                requestDev.post('/auth/login', {
                    email: email,
                    password: password,
                }).then((res) => {
                    if (!res.statusText === 'OK') {
                        return;
                    } else {
                        console.log(res);
                        setCookie('_tk', res.data.access_token, { path: '/', maxAge: res.data.expires_in })
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        navigate('/')
                    }
                }).catch((error) => { console.log(error); noti('Email hoặc mật khẩu không đúng'); });
            } catch (error) {
                console.log(error);
            }
        }


    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log({ "RESULT": result });
            console.log("USER", result.providerId, "==", result.user.email, "==",
                result);
            const requestURL = "http://127.0.0.1:8000/api/auth/login-with-google";

            axios.post(requestURL, {
                email: result.user.email,
                displayName: result.user.displayName,
                provider: result.providerId,
                uid: result.user.uid
            }).then((res) => {
                setCookie('_tk', res.data.access_token, { path: '/', maxAge: res.data.expires_in })
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/')
            }).catch((err) => { console.log(err); noti('Địa chỉ email này hiện đã được đăng ký sử dụng!'); });
        }).catch((error) => {
            console.log(error);
        });
    }

    const signIntWithFaceBook = () => {
        signInWithPopup(auth, facebookProvider).then((result) => {
            const user = result.user;
            const credential = facebookProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log(user, credential, accessToken);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);

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
                        <input placeholder="Email" className="loginInput" onChange={handleChangeEmail} />

                        <input placeholder="Password" type={"password"} className="loginInput" onChange={handleChangePassword} />

                        <button onClick={submitFormLLogin} className="loginButton">Đăng nhập</button>
                        <div className='loginOptionLogin'>
                            <span className='loginTextSpan'>Đăng nhập với</span>
                        </div>
                        <div className='loginButtonSocial'>
                            <div onClick={signInWithGoogle}><FcGoogle size={40} /></div>
                            <div onClick={signIntWithFaceBook}><FaFacebook size={40} color='blue' /></div>
                        </div>
                        <Link className="loginForgot" to="/forget-password"><span className="loginForgot">Quên mật khẩu?</span></Link>

                        <Link to="/registration" className="loginRegisterButton">
                            Tạo một tài khoản mới
                        </Link>

                    </div>
                </div>
            </div>
            <ToastContainer
                style={{ borderRadius: "5px", width: "400px" }}
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

export default Login;