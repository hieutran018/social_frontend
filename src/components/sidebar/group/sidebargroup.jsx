import '../sidebar.css';
import './group.css'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { HiOutlineUserGroup } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom';
import CloseFriend from '../../closefriend/CloseFriend';
import SkeletonGroup from './skeletonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MdOutlinePublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { TiGroupOutline } from 'react-icons/ti';
import default_cover from '../../../groups-default-cover-photo-2x.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, createNewGroup } from '../../../redux/actions/groupAction';
import { selectStatusGroup, selectGroup } from '../../../redux/selectors/groupSelector';

function SideBarGroup() {
    const dispatch = useDispatch();
    const status = useSelector(selectStatusGroup);
    const groups = useSelector(selectGroup);
    const user = JSON.parse(localStorage.getItem('user'));
    const cookies = useCookies('_tk')[0]._tk;
    // const [groups, SetGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [privacy, setPrivacy] = useState(1);

    const [groupName, setGroupName] = useState('');
    const hanldeChangeGroupName = (e) => {
        setGroupName(e.target.value);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(fetchGroup(cookies));
    }, [cookies, dispatch])

    const handleSubmitCreateGroup = () => {
        dispatch(createNewGroup(cookies, groupName, privacy));
    }

    return (
        <div className='sidebarGroup'>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Link to="/" className="sidebarListItemText">
                        <AiFillHome size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Trang Chủ </span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/groups/feeds" className="sidebarListItemText">
                        <VscFeedback size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Bảng tin của bạn</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="/groups/my_group" className="sidebarListItemText">
                        <HiOutlineUserGroup size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Nhóm của bạn</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <Link to="" className="sidebarListItemText">
                        <TiGroupOutline size={25} className="sidebarIcon" />
                        <span className="sidebarListItemText">Lời mời vào nhóm</span>
                    </Link>
                </li>
                <li className="sidebarListItem">
                    <button onClick={handleClickOpen} className='sidebarGroupCreateButton'> <IoMdAdd size={25} />Tạo nhóm mới</button>
                </li>

            </ul>
            <hr className="sidebarHr" />


            <div className='sidebarGroupJoined'>Nhóm đã tham gia</div>
            <div className="sidebarFriendList">
                {status === 'loading' ? <SkeletonGroup /> : status === 'succeeded' ? groups.map((group) => (
                    <CloseFriend key={group.id} group={group} />
                )) : <></>}
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sx"
                >

                    <div className='dialogCreateGroup'>
                        <div className='groupCreateGroup'>Tạo nhóm mới</div>
                        <hr className='groupCreateGroupHr' />
                        <div className='groupCreateContainer'>
                            <div className='groupCreateLeft'>

                                <div className='groupCreateLeftContainer' style={{ margin: "1rem" }}>

                                    <div className='groupCreateAdminGroup '>
                                        <div className='groupCreateAvatarAdminContainer '>
                                            <img className='groupCreateAvatarAdimin' src={user.avatar} alt="" />
                                        </div>
                                        <div className='groupCreateInforAdmin'>
                                            <div className='groupCreateNameAdmin'>
                                                {user.displayName}
                                            </div>
                                            <div className='groupCreatePositionAdmin'>Quản trị viên</div>
                                        </div>

                                    </div>
                                    <div className='groupCreateGroupNameContainer groupLeftItem'>
                                        <input placeholder='Tên nhóm...' onChange={hanldeChangeGroupName} className='groupCreateGroupName' type="text" />
                                    </div>

                                    <div onClick={handleClickOpenMenu} className='groupCreateGroupContainerPrivacy groupLeftItem'>
                                        <div className='groupCreateGroupPrivacy'>
                                            <div className='groupCreateGroupPrivacyOption'>
                                                {privacy === 1 ? <MdOutlinePublic size={25} /> : <RiGitRepositoryPrivateLine size={25} />}
                                                <span style={{ marginLeft: "2rem" }}>{privacy === 1 ? 'Công khai' : 'Riêng tư'}</span>
                                            </div>
                                            <div>
                                                <ArrowDropDownIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='groupCreateTextDescriptionPrivacy groupLeftItem'>
                                        <span style={{ fontSize: "16px" }}>
                                            {
                                                privacy === 1 ? 'Thành viên và khách truy cập có thể đăng bài trong nhóm. Quản trị viên có thể xét duyệt người lần đầu tham gia.' :
                                                    'Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.'
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className='groupCreateContainerSubmit groupLeftItem'>
                                        <button onClick={handleSubmitCreateGroup} className='groupCreateButtonSubmit '>
                                            Tạo nhóm
                                        </button>
                                    </div>
                                </div>


                            </div>
                            <div className='groupCreateRight'>
                                <div className='groupCreatePreviewContainer'>
                                    <div className='groupCreatePreview'>

                                        <div className='groupCreatePreviewTitleContainer preViewContainerGroup'>
                                            <span>Xem trước</span>
                                        </div>
                                        <div className='groupPreviewGroup'>
                                            <div className='groupCreatePreviewGroupContainer '>
                                                <img className='groupCreatePreviewGroup' src={default_cover} alt="" />
                                            </div>
                                            <div className='groupCreatePreviewGroupNameContainer preViewContainerGroup'>
                                                {
                                                    groupName ? groupName : 'Tên nhóm'
                                                }
                                            </div>
                                            <div className='groupCreatePreviewPrivacyContainer preViewContainerGroup'>
                                                {privacy === 1 ? 'Nhóm công khai' : 'Nhóm riêng tư'} . <span> 1 thành viên</span>
                                            </div>
                                            <div>
                                                <hr className='groupCreateGroupHr' />
                                            </div>
                                            <div className='preViewContainerGroup'>
                                                <div className='groupCreateItemTab'>Giới thiệu</div>
                                                <div className='groupCreateItemTab'>Bài viết</div>
                                                <div className='groupCreateItemTab'>Thành viên</div>
                                                <div className='groupCreateItemTab'>Tệp</div>
                                            </div>
                                            <div className='groupPreviewContainerFeed'>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => hanldeSelectPrivacy(1)} ><div className='groupCreateMenuPrivacy'> <MdOutlinePublic size={25} /> <span style={{ marginLeft: "20px" }}>Công khai</span></div></MenuItem>
                                <MenuItem onClick={() => hanldeSelectPrivacy(0)} ><div className='groupCreateMenuPrivacy'> <RiGitRepositoryPrivateLine size={25} /> <span style={{ marginLeft: "20px" }}>Riêng tư</span></div></MenuItem>
                            </Menu>

                        </div>
                    </div>

                </Dialog>
            </div>
        </div>
    )
}

export default SideBarGroup;