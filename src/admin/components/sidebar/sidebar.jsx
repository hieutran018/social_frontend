import './sidebar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RiFolderUserFill, RiEmotionLaughFill } from 'react-icons/ri';
import { BsFilePostFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi';
import { TbNews } from 'react-icons/tb';
import { GoReport } from 'react-icons/go';


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
            <Link to="/admin/posts" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(2)} className={tab === 2 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <BsFilePostFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý bài viết</span>
                </div>
            </Link>
            <hr />
            <Link to="/admin/post-status" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(3)} className={tab === 3 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <RiEmotionLaughFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý cảm xúc bài viết</span>
                </div>
            </Link>
            <hr />
            <Link to="/admin/groups" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(4)} className={tab === 4 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <HiUserGroup size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý nhóm</span>
                </div>
            </Link>
            <hr />
            <Link to="/admin/stories" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(5)} className={tab === 5 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <TbNews size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý bản tin</span>
                </div>
            </Link>
            <hr />
            <Link to="/admin/reports" className='adminHeaderUnlink'>
                <div onClick={() => handleSetTab(6)} className={tab === 6 ? 'adminSidebarTab adminTabActive' : 'adminSidebarTab'}>
                    <GoReport size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Phản hồi người dùng</span>
                </div>
            </Link>
            <hr />
        </div>
    );
}

export default AdminSidebar;