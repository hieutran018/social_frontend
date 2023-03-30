import './informationuser.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';


function InforMationUser({ idUser }) {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchInforUser() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: idUser })
            };
            const requestURL = "http://127.0.0.1:8000/api/profile-user";
            const response = await fetch(requestURL, requestOptions);

            const responseJson = await response.json();
            setUser(responseJson);
        }
        fetchInforUser();
    }, [idUser])
    console.log('USER ======================', user);

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='informationUser'>
            <div className='informationUserWrapper'>
                <div className='informationUserCol'>
                    <div className='informationUserTitleContainer'>
                        <span className='informationUserTitle'>Giới thiệu</span>
                        <div className='informationUserTab'>
                            <span>Tổng quan</span>
                        </div>
                        <div className='informationUserTab'>
                            <span>Công việc và học vấn</span>
                        </div>
                        <div className='informationUserTab'>
                            <span>Thông tin liên hệ cơ bản</span>
                        </div>
                        <div className='informationUserTab'>
                            <span>Gia đình và các mối quan hệ</span>
                        </div>
                    </div>
                    <div><hr className='informationUserHr' /></div>
                    <div className='informationUserDetailContainer'>
                        {
                            JSON.parse(localStorage.getItem('user')).id === idUser ? <div className='informationButtonContainer'>
                                <div onClick={() => handleClickOpen()} className='informationButton'> <div className='informationButtonEdit'><MoreHorizIcon /></div></div>
                            </div> : <div></div>
                        }
                        <div className='informationUserInforContainer'>
                            <span className='informationUserInfor'> <LocationOnIcon /> Đến từ: {user.address}</span>

                        </div>
                        <div className='informationUserInforContainer'>
                            <span className='informationUserInfor'> <HomeIcon /> Sống tại: Thành phố Hồ Chí Minh</span>

                        </div>
                        <div className='informationUserInforContainer'>
                            <span className='informationUserInfor'><FavoriteIcon /> Tình trạng: Độc thân</span>

                        </div>
                        <div className='informationUserInforContainer'>
                            <span className='informationUserInfor'><PhoneIcon /> Số điện thoại: 01215487985</span>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                >
                    <div className='informationDialog'>
                        <div className='informatioDialogTitleContainer'>
                            <span className='informatioDialogTitle'>Cập nhật thông tin Tổng quan</span>
                        </div>
                        <hr className='infomationDialogHr' />
                        <div className='informationUserDetailContainer'>

                            <div className='informationDialogInforContainer'>
                                <span className='informationUserInfor'> <LocationOnIcon /> Đến từ:</span> <input className='informationDialogInput' type="text" />

                            </div>
                            <div className='informationDialogInforContainer'>
                                <span className='informationUserInfor'> <HomeIcon /> Sống tại: </span><input className='informationDialogInput' type="text" />

                            </div>
                            <div className='informationDialogInforContainer'>
                                <span className='informationUserInfor'><FavoriteIcon /> Tình trạng: </span> <input className='informationDialogInput' type="check" />

                            </div>
                            <div className='informationDialogInforContainer'>
                                <span className='informationUserInfor'><PhoneIcon /> Số điện thoại:</span> <input au className='informationDialogInput' type="text" />

                            </div>
                        </div>
                        <div className='informationDialogBottom'>
                            <div className='informationDialogButtonBottom'>
                                <button onClick={handleClose} className='informationDialogButtonCancel'>Hủy</button>


                                <button className='informationDialogButtonSubmit'>Lưu</button>
                            </div>
                        </div>
                    </div>

                </Dialog>
            </div>
        </div>
    )
}

export default InforMationUser