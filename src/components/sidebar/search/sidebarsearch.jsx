import './sidebarsearch.css';
// import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { TiGroup } from 'react-icons/ti';
import { MdSelectAll } from 'react-icons/md';


function SidebarSearch() {

    return (
        <div>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <AiFillHome size={25} className="sidebarIcon" />
                    <span className="sidebarListItemText">Bảng tin</span>
                </li>
                <li className="sidebarListItem">
                    <MdSelectAll size={25} className="sidebarIcon" />
                    <span className="sidebarListItemText">Tất cả</span>
                </li>
                <li className="sidebarListItem">
                    <BsFillPeopleFill size={25} className="sidebarIcon" />
                    <span className="sidebarListItemText">Mọi người</span>
                </li>
                <li className="sidebarListItem">
                    <TiGroup size={25} className="sidebarIcon" />
                    <span className="sidebarListItemText">Nhóm</span>
                </li>
            </ul>
        </div>
    );
}

export default SidebarSearch;