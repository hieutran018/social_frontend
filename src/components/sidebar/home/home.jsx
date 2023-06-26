import '../sidebar.css';
import './home.css';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { RiVideoFill } from 'react-icons/ri';
import { TiGroup } from 'react-icons/ti';
const SidebarHomePage = () => {
    return (
        <div className='sidebarHome'>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <AiFillHome size={25} className="sidebarIcon" />
                    <span className="sidebarListItemText">Bảng tin</span>
                </li>
                <li className="sidebarListItem">
                    <Link to="/friend" className="sidebarListItemText">
                        <FaUserFriends size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Bạn bè</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/videos" className="sidebarListItemText">
                        <RiVideoFill size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Thước phim</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/groups/feeds" className="sidebarListItemText">
                        <TiGroup size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm</span>
                    </Link>
                </li>
                {/* <li className="sidebarListItem">
                    <Event className="sidebarIcon" />
                    <span className="sidebarListItemText">Sự kiện</span>
                </li> */}
            </ul>
            <button className="sidebarButton">Xem thêm</button>
            <hr className="sidebarHr" />
        </div>);
};

export default SidebarHomePage;