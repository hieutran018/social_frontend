import './sidebar.css';
import { AiFillHome } from 'react-icons/ai';
import { RiFolderUserFill } from 'react-icons/ri';
import { BsFilePostFill } from 'react-icons/bs';

function AdminSidebar() {
    return (
        <div className='adminSidebar'>
            <div className='adminSidebarTab'>
                <AiFillHome size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Trang chủ</span>
            </div>
            <hr />
            <div className='adminSidebarTab'>
                <RiFolderUserFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý người dùng</span>
            </div>
            <hr />
            <div className='adminSidebarTab'>
                <BsFilePostFill size={30} className='adminSidebarIcon' /> <span className='adminSidebarTabName'>Quản lý bài viết</span>
            </div>
            <hr />
        </div>
    );
}

export default AdminSidebar;