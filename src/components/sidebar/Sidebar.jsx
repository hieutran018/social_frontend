import { Link } from 'react-router-dom';
import {
    RssFeed,
    PlayCircleFilledOutlined,
    Groups3TwoTone,
    Event,
    GroupOutlined,
    RecordVoiceOver,
    PersonAddAlt1,
    Diversity3,
    Cake,
    ReduceCapacity,
} from '@mui/icons-material';
import './sidebar.css';
import CloseFriend from '../closefriend/CloseFriend';
import { Users } from "../../data";
import SidebarFriendSuggestion from './friendsuggestion/FriendSuggestion';

function Sidebar({ page }) {

    const SidebarVideo = () => {
        return (
            <>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" className="sidebarListItemText">
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">Trang Chủ</span>
                        </Link>
                    </li>
                    {/* <li className="sidebarListItem">
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
                    </li> */}
                </ul>
                {/* <button className="sidebarButton">Xem thêm</button>
                <hr className="sidebarHr" /> */}
                {/* <ul className="sidebarFriendList">
                {Users.map((u) => (
                    <CloseFriend key={u.id} user={u} />
                ))}
            </ul> */}
            </>
        );
    };

    const SideBarFriend = () => {
        return (
            <>
                <>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <GroupOutlined className="sidebarIcon" />
                            <span className="sidebarListItemText">Trang Chủ </span>
                        </li>
                        <li className="sidebarListItem">
                            <RecordVoiceOver className="sidebarIcon" />
                            <span className="sidebarListItemText">Lời mời kết bạn</span>
                        </li>
                        <li className="sidebarListItem">
                            <Link to="/friend-suggestion" className="sidebarListItemText">
                                <PersonAddAlt1 className="sidebarIcon" />
                                <span className="sidebarListItemText">Gợi ý</span>
                            </Link>
                        </li>
                        <li className="sidebarListItem">
                            <Diversity3 className="sidebarIcon" />
                            <span className="sidebarListItemText">Tất cả bạn bè</span>
                        </li>
                        <li className="sidebarListItem">
                            <Cake className="sidebarIcon" />
                            <span className="sidebarListItemText">Sinh nhật</span>
                        </li>
                        <li className="sidebarListItem">
                            <ReduceCapacity className="sidebarIcon" />
                            <span className="sidebarListItemText">Danh sách tùy chỉnh</span>
                        </li>
                    </ul>

                    <hr className="sidebarHr" />

                </>
            </>
        );
    }

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
                        <Groups3TwoTone className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Sự kiện</span>
                    </li>
                </ul>
                <button className="sidebarButton">Xem thêm</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </>);
    };
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {page === 1 ? <SidebarHomePage /> : page === 2 ? <SidebarVideo /> : page === 3 ? <SideBarFriend /> : <SidebarFriendSuggestion />}
            </div>
        </div>
    );
}


export default Sidebar;