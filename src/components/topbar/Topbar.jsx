import { Search, Chat, Notifications } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavItem from '../navitem/navitem';
import DropdownMenu from '../dropdownmenu/dropdownmenu';
import './topbar.css';


function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <a href='/' className="sidebarLogo">
                    {<span className="logo">CKCS</span>}
                </a>
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

                <div className="topbarIcons">

                    <div className="topbarIconItem">
                        <Chat fontSize='25' />
                        {/* <span className="topbarIconBadge">2</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Notifications fontSize='25' />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>

                <NavItem icon={<ArrowDropDownIcon />}>
                    <DropdownMenu />
                </NavItem>
            </div>
        </div>
    );
}

export default Topbar;