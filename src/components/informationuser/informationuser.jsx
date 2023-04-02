import './informationuser.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions/userAction';
import { selectStatusupdate } from '../../redux/selectors/postSelector';


function InforMationUser({ user }) {
    const { userId } = useParams();
    const cookies = useCookies('_tk')
    const [open, setOpen] = useState(false);
    const [check, setCheck] = useState(true);
    const [wentTo, setWentTo] = useState('');
    const [liveIn, setliveIn] = useState('');
    const [relationship, setRelationShip] = useState('');
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const status = useSelector(selectStatusupdate);


    const handleClickOpen = () => {
        setOpen(true);


    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSetliveIn = (event) => {
        setliveIn(event.target.value);
    }
    const handleSetWentTo = (event) => {
        setWentTo(event.target.value);
    }
    const handleSetRelationShip = (event) => {
        setRelationShip(event.target.value);
        setCheck(false);
    }
    const handleSetPhone = (event) => {
        setPhone(event.target.value);
    }

    const Submit = () => {
        console.log(wentTo, liveIn, relationship, phone);
        dispatch(updateUser(cookies, wentTo, liveIn, relationship, phone));
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

                    {
                        status === 'loading' ? <div></div> : status === 'success' || user ? <div className='informationUserDetailContainer'>
                            {
                                JSON.parse(localStorage.getItem('user')).id.toString() === userId ? <div className='informationButtonContainer'>
                                    <div onClick={() => handleClickOpen()} className='informationButton'> <div className='informationButtonEdit'><MoreHorizIcon /></div></div>
                                </div> : <div></div>
                            }
                            <div className='informationUserInforContainer'>
                                <span className='informationUserInfor'> <LocationOnIcon /> Đến từ: {user.went_to ? user.went_to : " Chưa cập nhật"}</span>

                            </div>
                            <div className='informationUserInforContainer'>
                                <span className='informationUserInfor'> <HomeIcon /> Sống tại: {user.live_in ? user.live_in : " Chưa cập nhật"}</span>

                            </div>
                            <div className='informationUserInforContainer'>
                                <span className='informationUserInfor'><FavoriteIcon /> Tình trạng: {user.relationship === '0' ? "Độc thân" : user.relationship === '1' ? "Hẹn Hò" : user.relationship === '2' ? "Kết hôn" : "Chưa cập nhật"}</span>

                            </div>
                            <div className='informationUserInforContainer'>
                                <span className='informationUserInfor'><PhoneIcon /> Số điện thoại: {user.phone ? user.phone : "Chưa cập nhật"}</span>

                            </div>
                        </div> : <div></div>
                    }

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
                        <div className='informationUserForm'>
                            <div className='informatioDialogTitleContainer'>
                                <span className='informatioDialogTitle'>Cập nhật thông tin Tổng quan</span>
                            </div>
                            <hr className='infomationDialogHr' />
                            <div className='informationUserDetailContainer'>

                                <div className='informationDialogInforContainer'>
                                    <span className='informationUserInfor'> <LocationOnIcon /> Đến từ:</span> <input onChange={handleSetWentTo} className='informationDialogInput' type="text" />

                                </div>
                                <div className='informationDialogInforContainer'>
                                    <span className='informationUserInfor'> <HomeIcon /> Sống tại: </span><input onChange={handleSetliveIn} className='informationDialogInput' type="text" />

                                </div>
                                <div className='informationDialogInforContainer'>
                                    <span className='informationUserInfor'><FavoriteIcon /> Tình trạng: </span> <select onChange={handleSetRelationShip} className='informationDialogInput'>
                                        <option value="0">Độc thân</option>
                                        <option value="1">Hẹn Hò</option>
                                        <option value="2">Đã kết hôn</option>

                                    </select>

                                </div>
                                <div className='informationDialogInforContainer'>
                                    <span className='informationUserInfor'><PhoneIcon /> Số điện thoại:</span> <input onChange={handleSetPhone} className='informationDialogInput' type="text" />

                                </div>
                            </div>
                            <div className='informationDialogBottom'>
                                <div className='informationDialogButtonBottom'>
                                    <button onClick={handleClose} className='informationDialogButtonCancel'>Hủy</button>


                                    <button onClick={Submit} disabled={check ? true : false} className='informationDialogButtonSubmit'>Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Dialog>
            </div>
        </div>
    )
}

export default InforMationUser