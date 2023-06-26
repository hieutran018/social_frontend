import { Link } from 'react-router-dom';
import {
    RssFeed,
    GroupOutlined,
    RecordVoiceOver,
    PersonAddAlt1,
    Diversity3,
    Cake,
    ReduceCapacity,
} from '@mui/icons-material';

import './sidebar.css';
import SidebarHomePage from './home/home';
import SidebarFriendSuggestion from './friendsuggestion/FriendSuggestion';
import FriendRequest from './friendrequest/friendrequest';
import SideBarGroup from './group/sidebargroup';
import SidebarSearch from './search/sidebarsearch'
import SidebarSetting from './setting/setting';
import SidebarStories from './stories/sidebarsories';
import SidebarListStory from './stories/sidebarListstory';
import SidebarChat from './chat/sidebarchat';

function Sidebar({ page }) {
    const SidebarVideo = () => {
        return (
            <div className='sidebarVideos'>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" className="sidebarListItemText">
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">Trang Chủ</span>
                        </Link>
                    </li>
                    {/* <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Mọi người</span>
                    </li> */}
                    {/*
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
            </div>
        );
    };

    const SideBarFriend = () => {
        return (

            <div className='sidebarFriend'>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to="/" className="sidebarListItemText">
                            <GroupOutlined className="sidebarIcon" />
                            <span className="sidebarListItemText">Trang Chủ </span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/friend-request" className="sidebarListItemText">
                            <RecordVoiceOver className="sidebarIcon" />
                            <span className="sidebarListItemText">Lời mời kết bạn</span>
                        </Link>
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



            </div>

        );
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                {page === 1 ?
                    <SidebarHomePage /> : page === 2 ?
                        <SidebarVideo /> : page === 3 ?
                            <SideBarFriend /> : page === 4 ?
                                <FriendRequest /> : page === 5 ?
                                    <SideBarGroup /> : page === 6 ?
                                        <SidebarSearch /> : page === 7 ?
                                            <SidebarSetting /> : page === 8 ?
                                                <SidebarStories /> : page === 9 ?
                                                    <SidebarListStory /> : page === 10 ?
                                                        <SidebarChat /> : <SidebarFriendSuggestion />}
            </div>
        </div>
    );
}


export default Sidebar;