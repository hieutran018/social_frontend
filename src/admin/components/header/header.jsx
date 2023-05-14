import './header.css';
import avatar from '../../../ckc_social_logo.png';
import { FiBell } from 'react-icons/fi';

function AdminHeader() {
    return (
        <div className='adminHeader'>
            <div className='adminHeaderRight'>
                <div className='adminHeaderNotification'>
                    <FiBell size={30} color='white' />
                </div>
                <div className='adminHeaderUser'>
                    <img className='adminHeaderAvatarUser' src={avatar} alt="" />
                    <div className='adminHeaderUserName'>Trần Dương Chí Hiếu</div>
                </div>
            </div>
        </div>
    );
}

export default AdminHeader;