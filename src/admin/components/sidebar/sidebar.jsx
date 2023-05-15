import './sidebar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RiFolderUserFill } from 'react-icons/ri';
import { BsFilePostFill } from 'react-icons/bs';

function AdminSidebar() {
    const [tab, setTab] = useState();

    const handleSetTab = (tab) => {
        setTab(tab);
    }
    useEffect(() => {
        setTab(tab ? tab : 0);
    }, [tab])
    return (
        <div className='adminSidebar'>
            <Link to="/admin/dashboard" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(0)} className={tab === 0 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <AiFillHome size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Dash board</span>
                </div>
            </Link>
            <hr className='adminSidebarHr' />
            <Link to="/admin/users" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(1)} className={tab === 1 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <RiFolderUserFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý người dùng</span>
                </div>
            </Link>
            <hr />
            <div onClick={() => handleSetTab(2)} className={tab === 2 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                <BsFilePostFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý bài viết</span>
            </div>
            <hr />
        </div>
    );
}

export default AdminSidebar;