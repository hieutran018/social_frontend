import './profile.css';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import avatar from '../../../ckc_social_logo.png';

function AdminProfile() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('admin/login');
    }
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
                            <div className='adminProfileName'>Tran Duong Chi Hieu</div>
                        </div>

                        <div className='adminProfileInfoBottom'>
                            <div className='adminProfileBottomLeft'>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Email:</span> <input className='adminProfileInfoItemContent' placeholder='tranduongchhieu@gmail.com' />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Ngày sinh:</span> <input className='adminProfileInfoItemContent' placeholder='25/04/2001' />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Giới Tính:</span> <input className='adminProfileInfoItemContent' placeholder='Nam' />
                                </div>
                                <div className='adminProfileInfoItem'>
                                    <span className='adminProfileInfoItemDescription'>Địa chỉ:</span> <input className='adminProfileInfoItemContent' placeholder='Thành phố Hồ Chí Minh' />
                                </div>
                            </div>

                        </div>
                        <div className='adminProfileInfoAction'>
                            <button className='adminProfileInfoActionChangPassword'>Đổi mật khẩu</button>
                            <div>

                                <button onClick={() => navigate(-1)} className='adminProfileInfoActionCancel'>Quay lại</button>

                                <button onClick={handleLogout} className='adminProfileInfoActionOptions'>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;