import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Event,
} from '@mui/icons-material';
import './sidebar.css';
// import { Users } from "../../data";

function Sidebar() {
    return (<div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeed className="sidebarIcon" />
                    <span className="sidebarListItemText">Bảng tin</span>
                </li>
                <li className="sidebarListItem">
                    <Chat className="sidebarIcon" />
                    <span className="sidebarListItemText">Tin nhắn</span>
                </li>
                <li className="sidebarListItem">
                    <PlayCircleFilledOutlined className="sidebarIcon" />
                    <span className="sidebarListItemText">Thước phim</span>
                </li>
                <li className="sidebarListItem">
                    <Group className="sidebarIcon" />
                    <span className="sidebarListItemText">Nhóm</span>
                </li>
                <li className="sidebarListItem">
                    <Event className="sidebarIcon" />
                    <span className="sidebarListItemText">Sự kiện</span>
                </li>
            </ul>
            <button className="sidebarButton">Xem thêm</button>
            <hr className="sidebarHr" />
            {/* <ul className="sidebarFriendList">
                {Users.map((u) => (
                    <CloseFriend key={u.id} user={u} />
                ))}
            </ul> */}
        </div>
    </div>);
}

export default Sidebar;