import './profile.css';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import avatar from '../../../ckc_social_logo.png';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProfile() {
    const navigate = useNavigate();
    const cookies = useCookies('tk')[0].tk;
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/auth/admin/me';
        axios({
            method: "POST",
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setEmail(response.data.email);
            setDisplayName(response.data.displayName);
            setSex(response.data.sex);
            setBirthdate(response.data.date_of_birth);
            setAddress(response.data.address);
            setAvatar(response.data.avatar);
            console.log(response.data);
        }).catch(error => console.log(error));
    }, [cookies])
    return (
        <div className='adminProfile'>
            <div className='adminProfileWrapper'>
                <div className='adminProfileBreadCrumb'>
                    <div className='adminProfileIconContainer'><CgProfile size={30} className='adminProfileIcon' /></div>
                    <div className='adminProfileBreadCrumbTitle'>Thông tin cá nhân</div>
                </div>

                <div className='adminProfilelMain'>
                    <div className='adminProfileInfoWrapper'>
                        <div className='adminProfileInfoTop'>
                            <img className='adminProfileAvatar' src={avatar} alt="" />
                            <div className='adminProfileName'>{displayName}</div>
                        </div>

                        <div className='adminProfileInfoBottom'>
                            <div className='adminProfileBottomLeft'>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Email:</span> <input className='adminProfileInfoItemContent' placeholder={email} />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Ngày sinh:</span> <input className='adminProfileInfoItemContent' placeholder={birthdate} />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Giới Tính:</span> <input className='adminProfileInfoItemContent' placeholder={sex} />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Địa chỉ:</span> <input className='adminProfileInfoItemContent' placeholder={address} />
                                </div>
                            </div>

                        </div>
                        <div className='adminProfileInfoAction'>
                            <button className='adminProfileInfoActionChangPassword'>Đổi mật khẩu</button>
                            <div>

                                <button onClick={() => navigate(-1)} className='adminProfileInfoActionCancel'>Quay lại</button>

                                <button className='adminProfileInfoActionOptions'>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;