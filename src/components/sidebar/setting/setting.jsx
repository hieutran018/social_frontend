import './setting.css';
import { IoMdArrowBack } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { Link, useParams } from 'react-router-dom';
function SidebarSetting() {
    const setting = useParams().setting;

    return (
        <div className='sidebarSetting'>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Link to="/" className="sidebarSettingButtonBack">
                        <IoMdArrowBack size={30} className="sidebarSettingIconBack" />
                    </Link>
                    <span className="sidebarSettingItemText">Cài đặt </span>
                </li>
                <li className={setting || !setting ? "sidebarListItem sidebarActive" : "sidebarListItem"}>
                    <Link to="" className="sidebarListItemText">
                        <VscAccount size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Thông tin tài khoản</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarSetting;