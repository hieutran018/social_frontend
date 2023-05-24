import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../../../ckc_social_logo.png';
import { FiBell } from 'react-icons/fi';
import { GrLogout } from 'react-icons/gr';
import { MdPassword } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function AdminHeader() {
    const user = JSON.parse(localStorage.getItem('adminInfo'));
    const [cookies, remove] = useCookies(["tk"]);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        const requestURL = 'http://127.0.0.1:8000/api/auth/admin/logout';
        axios({
            method: 'POST',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies.tk,
                'Access-Control-Allow-Origin': '*',
            }
        }).then(() => { remove('tk'); localStorage.removeItem('adminInfo'); navigate('/admin/login') }).catch((err) => { console.log(err.message); });
    }
    return (
        <div className='adminHeader'>
            <div className='adminHeaderLeft'>
                <Link to="/admin/dashboard" className="adminHeaderLogoUnlink">
                    <span className="adminHeaderLogo">CKCS</span>
                </Link>
            </div>
            <div className='adminHeaderRight'>
                <div className='adminHeaderNotification'>
                    <FiBell size={30} color='blue' />
                </div>
                <div onClick={handleClick} className='adminHeaderUser'>
                    <img className='adminHeaderAvatarUser' src={user.avatar} alt="" />
                    <div className='adminHeaderUserName'>{user.displayName}</div>
                </div>

            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem style={{ width: "300px" }} onClick={handleClose}>
                    <Link to='/admin/profile' className='adminHeaderMenuTop'>
                        <img className='adminHeaderMenuItemAvatar' src={user.avatar} alt="" />
                        <div className='adminHeaderMenuItemUserName'>{user.displayName}</div>
                    </Link>
                </MenuItem>
                <MenuItem style={{ width: "300px" }} onClick={handleClose}>
                    <div className='adminHeaderMenuItem'>
                        <MdPassword size={30} />
                        <div className='adminHeaderMenuItemOptionText'>Đổi mật khẩu</div>
                    </div>
                </MenuItem>
                <MenuItem style={{ width: "300px" }} onClick={handleLogout}>
                    <div className='adminHeaderMenuItem'>
                        <GrLogout size={30} />
                        <div className='adminHeaderMenuItemOptionText'>Đăng xuất</div>
                    </div>
                </MenuItem>
            </Menu>

        </div>

    );
}

export default AdminHeader;