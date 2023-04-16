import '../sidebar.css';
import { Link } from 'react-router-dom';
import {
    RssFeed,
    PlayCircleFilledOutlined,
    Groups3TwoTone,
    Event,
    GroupOutlined,
} from '@mui/icons-material';
import CloseFriend from '../../closefriend/CloseFriend';
import { Users } from "../../../data";
const SidebarHomePage = () => {
    return (
        <>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeed className="sidebarIcon" />
                    <span className="sidebarListItemText">Bảng tin</span>
                </li>
                <li className="sidebarListItem">
                    <Link to="/friend" className="sidebarListItemText">
                        <GroupOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Bạn bè</span>
                    </Link>

                </li>
                <li className="sidebarListItem">
                    <Link to="/video" className="sidebarListItemText">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Thước phim</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/groups/feeds" className="sidebarListItemText">
                        <Groups3TwoTone className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Event className="sidebarIcon" />
                    <span className="sidebarListItemText">Sự kiện</span>
                </li>
            </ul>
            <button className="sidebarButton">Xem thêm</button>
            <hr className="sidebarHr" />

        </>);
};

export default SidebarHomePage;