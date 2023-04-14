import '../sidebar.css';
import {
    RssFeed,
    RecordVoiceOver,
    PersonAddAlt1,
} from '@mui/icons-material';
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom';
import CloseFriend from '../../closefriend/CloseFriend';
import { Users } from "../../../data";

function SideBarGroup() {
    return (
        <div className='sidebarGroup'>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Link to="/" className="sidebarListItemText">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Trang Chủ </span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/friend-request" className="sidebarListItemText">
                        <RecordVoiceOver className="sidebarIcon" />
                        <span className="sidebarListItemText">Bảng tin của bạn</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/friend-suggestion" className="sidebarListItemText">
                        <PersonAddAlt1 className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm của bạn</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <button className='sidebarGroupCreateButton'> <IoMdAdd size={25} />Tạo nhóm mới</button>

                </li>

            </ul>
            <hr className="sidebarHr" />
            <ul className="sidebarFriendList">
                {Users.map((u) => (
                    <CloseFriend key={u.id} user={u} />
                ))}
            </ul>


        </div>
    )
}

export default SideBarGroup;