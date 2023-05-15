import { useEffect, useState } from 'react';
import './detailuser.css';
import Dialog from '@mui/material/Dialog';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser, updateDisplaynameUser, updatePhoneUser } from '../../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/selectors/postSelector';

function DetailUser() {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [openEditName, setOpenName] = useState(false);
    const [openEditPhone, setOpenEditPhone] = useState(false);
    const [displayName, setDisplayName] = useState(user ? user.displayName : '');
    const [phone, setPhone] = useState(user ? user.phone : '');
    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const noti = (textNoti) => {
        toast.success(textNoti, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const toggleOpenName = () => {
        setOpenName(true);
    }
    const toggleCloseName = () => {
        setOpenName(false);
        setDisplayName(user ? user.displayName : '');
    }
    const toggleOpenPhone = () => {
        setOpenEditPhone(true);
    }
    const toggleClosePhone = () => {
        setOpenEditPhone(false);
    }
    const toggleOpenPassword = () => {
        setOpen(true);
    }
    const toggleClosePassword = () => {
        setOpen(false);
        setCurrentPassword('');
        setPassword('')
        setConfirmPassword('');
    }
    const handleChangeDisplayName = (event) => {
        setDisplayName(event.target.value);
    }
    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    }
    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    useEffect(() => {
        dispatch(currentUser(cookies))
    }, [cookies, dispatch])
    const submitUpdateDisplayName = () => {
        dispatch(updateDisplaynameUser(cookies, displayName));
        setOpenName(false);
    }
    const submitUpdatePhone = () => {
        dispatch(updatePhoneUser(cookies, phone))
        setOpenEditPhone(false);
    }

    const submitUpdatePassword = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/update-password-user';
        axios({
            method: "POST",
            url: requestURL,
            data: {
                currentPassword: currentPassword, password: password, confirmPassword: confirmPassword
            },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setOpen(false);
            noti('Cập nhật mật khẩu thành công!')
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='detailuser'>
            {
                user ? <div className='detailuserWrapper'>
                    <div className='detailuserTitle'>
                        Thông tin của bạn trên CKCSocial
                    </div>
                    <div className='detailuserDescriptionPage'>
                        Chi tiết thông tin về tài khoản của bạn
                    </div>
                    <div>
                        <hr className='detailUserHr' />
                    </div>
                    <div className='detailuserMainContainer'>
                        <div className='detailuserOption'>
                            <div className='detailuserTitleOption'>Tên hiển thị</div>
                            {
                                openEditName ? <div className='detailUserInputContainer'><input className='detailUserInputEditName' value={displayName} onChange={handleChangeDisplayName} type="text" maxLength={100} minLength={1} /> <div className='detailuserLinkOption' onClick={toggleCloseName}>Đóng</div></div> : <div className='detailuserDescriptionOption'>{user.displayName}</div>
                            }
                            <div className='detailuserLinkOption' onClick={openEditName ? submitUpdateDisplayName : toggleOpenName}>{openEditName ? "Xác nhận" : "Cập nhật"}</div>
                        </div>
                        <hr />
                        <div className='detailuserOption'>
                            <div className='detailuserTitleOption'>Địa chỉ email</div>
                            <div className='detailuserDescriptionOption'>{user.email}</div>
                            <div className='detailuserLinkOption'></div>
                        </div>
                        <hr />
                        <div className='detailuserOption'>
                            <div className='detailuserTitleOption'>Số điện thoại</div>
                            {
                                openEditPhone ? <div className='detailUserInputContainer'><input className='detailuserEditPhone' value={phone} onChange={handleChangePhone} type="number" maxLength={10} minLength={1} /> <div className='detailuserLinkOption' onClick={toggleClosePhone}>Đóng</div></div> : <div className='detailuserDescriptionOption'>{user.phone ? user.phone : "Chưa cập nhật"}</div>
                            }
                            <div className='detailuserLinkOption' onClick={openEditPhone ? submitUpdatePhone : toggleOpenPhone}>{openEditPhone ? "Xác nhận" : "Cập nhật"}</div>
                        </div>
                        <hr />
                        <div className='detailuserOption'>
                            <div className='detailuserTitleOption'>Mật khẩu</div>
                            <div className='detailuserDescriptionOption'></div>
                            <div className='detailuserLinkOption' onClick={toggleOpenPassword}>Cập nhật</div>
                        </div>
                    </div>
                    <div>
                        <hr className='detailuserHrEnd' />
                    </div>
                </div> :
                    <></>
            }
            <Dialog
                open={open}
                onClose={toggleClosePassword}
                fullWidth
                maxWidth="sm"
            >
                <div className='dialogUpdatePassword'>
                    <div className='dialogUpdatePasswordHeader'>
                        <div className='dialogUpdatePasswordTitle'>Đổi mật khẩu</div>
                    </div>
                    <hr />
                    <div className='dialogUpdatePasswordContent'>
                        <div className='dialogUpdatePasswordInputContainer'>
                            <span className='dialogUpdatePasswordDescription'>Mật khẩu cũ:</span>
                            <input onChange={handleChangeCurrentPassword} value={currentPassword} className='dialogUpdatePasswordInput' type="password" autoComplete='current-password' />
                        </div>
                    </div>
                    <div className='dialogUpdatePasswordContent'>
                        <div className='dialogUpdatePasswordInputContainer'>
                            <span className='dialogUpdatePasswordDescription'>Mật khẩu mới:</span>
                            <input onChange={handleChangePassword} value={password} className='dialogUpdatePasswordInput' type="password" autoComplete='password' />
                        </div>
                    </div>
                    <div className='dialogUpdatePasswordContent'>
                        <div className='dialogUpdatePasswordInputContainer'>
                            <span className='dialogUpdatePasswordDescription'>Xác nhận mật khẩu mới:</span>
                            <input onChange={handleChangeConfirmPassword} value={confirmPassword} className='dialogUpdatePasswordInput' type="password" autoComplete='confirm-password' />
                        </div>
                    </div>
                    <div className='dialogUpdatePasswordBottom'>
                        <button onClick={toggleClosePassword} className='dialogUpdatePasswordCancel'>Hủy</button>
                        <button onClick={submitUpdatePassword} className='dialogUpdatePasswordCofirm'>Xác nhận</button>
                    </div>
                </div>
            </Dialog>
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

export default DetailUser;