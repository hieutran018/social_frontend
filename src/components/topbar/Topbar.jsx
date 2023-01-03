import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import './topbar.css';

function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">CKCS</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Tìm kiếm bạn bè..."
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Trang chủ</span>
                    <span className="topbarLink">Dòng thời gian</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        {/* <span className="topbarIconBadge">2</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>
                <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
            </div>
        </div>
    );
}

export default Topbar;