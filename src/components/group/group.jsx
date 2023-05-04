import './group.css';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MdOutlinePublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Share from '../share/Share';

import FriendCard from './friendcard/friendcard';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editGroup } from '../../redux/actions/groupAction';
import Feed from '../../components/feed/Feed';
import Variants from '../../components/feed/postskeleton';
import { selectPost, selectPostStatus, selectPage } from '../../redux/selectors/postSelector';
import { fetchPostGroupByIdGroup } from '../../redux/actions/postAction';
import Member from './members/member';
import FileList from './files/files';
import FileTab from './files/filetab';



function GroupPage() {
    const groupTab = useParams().groupTab;
    const groupId = useParams().groupId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const page = useSelector(selectPage);
    const [nextPage, setNextPage] = useState(0);
    const statusPosts = useSelector(selectPostStatus);
    const cookies = useCookies('_tk')[0]._tk;
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [friends, setFriends] = useState([]);

    const [privacy, setPrivacy] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [groupName, setGroupName] = useState('');
    const [group, setGroup] = useState([]);
    const [file, setFile] = useState();


    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleChangeGroupName = (event) => {
        setGroupName(event.target.value);
    }
    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
        fetchListFriend();
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSetting = () => {
        setOpenSetting(true);

    };
    const handleCloseSetting = () => {
        setOpenSetting(false);
    };
    const handleChangeFiles = (event) => {
        const avatar = event.target.files[0];
        avatar.preview = URL.createObjectURL(avatar);
        setFile(event.target.files[0])

    }
    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight

        )
            return;
        setNextPage(nextPage === page ? page : nextPage + 1);
    };
    useEffect(() => {
        function fetchGroupByIdGroup() {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-group-by-id/' + groupId;
            axios({
                method: "GET",
                url: requestURL,
                headers: {
                    Authorization: "Bearer " + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("CHECK ADMIN", response.data)
                setGroup(response.data)
                setGroupName(response.data.group_name);
                setPrivacy(response.data.privacy)
                setUpdate(false);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchGroupByIdGroup()
        dispatch(fetchPostGroupByIdGroup(cookies, groupId, nextPage))
        window.addEventListener("scroll", handleScroll);

        return () => {
            file && URL.revokeObjectURL(file.preview);

        }

    }, [groupId, cookies, update, file, dispatch, nextPage])

    function fetchListFriend() {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-friend-to-invite-group/" + group.id;
        axios({
            method: 'GET',
            url: requestURL,

            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log(response.data)
            setFriends(response.data);



        }).catch((error) => console.log(error));
    }


    function editInformationGroup() {
        dispatch(editGroup(cookies, groupId, groupName, privacy, file));
        setOpenSetting(false);
        setUpdate(true);
        setFile();

    }
    const handleClickTab = (istab) => {
        navigate('/groups/group/' + group.id + '/' + istab)
    }

    return (
        <div className='groupPage'>
            <div className='groupPageAvatarContainer'>
                <img className='groupPageAvatar' src={group.avatar} alt="" />
            </div>
            <div className='groupPageInforContainer'>
                <div className='groupPageGroupNameContainer'>
                    <span className='groupPageGroupName'>{group.group_name}</span>
                </div>
                <div style={{ display: "flex" }}>
                    <div onClick={handleClickOpen} className='groupPageInviteUser'>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Mời
                        </div>

                    </div>
                    {
                        group.isAdminGroup ?
                            <div onClick={handleClickOpenSetting} className='groupPageSetting'>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div> :
                            <></>
                    }
                </div>

            </div>
            <hr className="sidebarHr" />
            <div className='groupPageTabMenu'>
                <div onClick={() => handleClickTab('')} className={groupTab === undefined ? 'groupPageMenuTab avtiveTab' : 'groupPageMenuTab'}><span className='groupPageMenuTabText'>Bài viết</span></div>
                <div onClick={() => handleClickTab('member')} className={groupTab === 'member' ? 'groupPageMenuTab avtiveTab' : 'groupPageMenuTab'}><span className='groupPageMenuTabText'>Mọi người</span></div>
                <div onClick={() => handleClickTab('mediafiles')} className={groupTab === 'mediafiles' ? 'groupPageMenuTab avtiveTab' : 'groupPageMenuTab'}><span className='groupPageMenuTabText'>Files</span></div>
            </div>
            {
                groupTab === 'member' ?
                    <div className='groupPageMainContainer groupMember'>

                        <Member auth={group.isAdminGroup} />

                    </div> :
                    groupTab === 'mediafiles' ?
                        <div className='groupPageMainContainer'>
                            <div className='groupPageFiles'>
                                <div className='groupPageFilesContainer'>
                                    <div className='groupPageFilesTitle'>
                                        File được chia sẻ
                                    </div>
                                    <FileTab />
                                </div>
                            </div>
                        </div>
                        :
                        <div className='groupPageMainContainer'>
                            <div className='groupPageFeeds'>
                                <Share group={groupId} />
                                {
                                    statusPosts === 'loading' ?
                                        [0, 1].map((item) => (
                                            <Variants key={item} />
                                        )) :
                                        statusPosts === 'succeeded' ? <Feed post={posts} isGroup={true} /> :
                                            statusPosts === 'failed' ? [0, 1].map((item) => (
                                                <Variants key={item} />
                                            )) :
                                                [0, 1].map((item) => (
                                                    <Variants key={item} />
                                                ))
                                }

                            </div>
                            <div className='groupPageRightContainer'>
                                <div className='groupPageIntroduceGroupContainer'>
                                    <div style={{ margin: "1rem" }}>
                                        <span className='groupPageIntroduce'> Giới thiệu</span>
                                    </div>
                                    <div className='groupPageIntroduceGroupNameContainer'>
                                        <span className='groupPageIntroduceGroupName'>{group.group_name}</span>
                                    </div>
                                    <div className='groupPageIntroduceGroupPrivacyContainer'>
                                        <div className='groupPageIntroduceGroupPrivacy'>
                                            {
                                                group.privacy === 1 ? <MdOutlinePublic size={25} /> : <RiGitRepositoryPrivateLine size={25} />
                                            }
                                            <span style={{ marginLeft: "20px" }}>{group.privacy === 1 ? 'Nhóm công khai' : "Nhóm riêng tư"}</span>
                                        </div>
                                        <div>
                                            <span style={{ marginLeft: "45px" }}>{
                                                group.privacy === 1 ? "Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng." : "Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng."
                                            }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='groupPageMediFileGroupContainer'>
                                    <div style={{ margin: "1rem" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span className='groupPageIntroduce'> File được chia sẻ</span> <Link to={'/groups/group/' + groupId + '/mediafiles'}> <span>Xem thêm</span></Link>
                                        </div>
                                    </div>


                                    <FileList />


                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
            }
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <div className='dialogInviteFriendToGroup'>
                        <div className='dialogInviteFriendToGroupTitle'>Mời bạn bè vào nhóm</div>
                        <hr className='dialogInviteFriendToGroupHr' />
                        <div className='dialogInviteFriendToGroupListFriend'>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {
                                    friends.map((friend) => (
                                        <FriendCard key={friend.id} friend={friend} />
                                    ))
                                }

                            </List>
                        </div>
                    </div>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={openSetting}
                    onClose={handleCloseSetting}
                    fullWidth
                    maxWidth="sm"
                >
                    <div className='dialogInviteFriendToGroup'>
                        <div className='dialogInviteFriendToGroupTitle'>Tùy chỉnh về nhóm</div>
                        <hr className='dialogInviteFriendToGroupHr' />
                        <div className='dialogSettingGroupPage'>
                            <div className='dialogSettingGroupPageWrapper'>
                                <div className='dialogSettingGroupNameContainer'>
                                    <span className='dialogSettingGroupLabel'>Tên và mô tả  </span>
                                    <div>
                                        <input value={groupName} onChange={handleChangeGroupName} className='dialogSettingInputGroupName' type="text" />
                                    </div>
                                </div>
                                <div className='dialogSettingGroupNameContainer'>
                                    <span className='dialogSettingGroupLabel'>Quyền riêng tư  </span>

                                    <div onClick={handleClickOpenMenu} className='dialogSettingGroupPrivacyContainer'>
                                        <div className='dialogSettingGroupPrivacyOption'>
                                            <div className='groupCreateGroupPrivacyOption'>
                                                {privacy === 1 ? <MdOutlinePublic size={25} /> : <RiGitRepositoryPrivateLine size={25} />}
                                                <span style={{ marginLeft: "2rem" }}>{privacy === 1 ? 'Công khai' : 'Riêng tư'}</span>
                                            </div>
                                            <div>
                                                <ArrowDropDownIcon />
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
                                            <MenuItem onClick={() => hanldeSelectPrivacy(1)} ><div className='dialogGroupMenuPrivacy'> <MdOutlinePublic size={25} /> <span style={{ marginLeft: "20px" }}>Công khai</span></div></MenuItem>
                                            <MenuItem onClick={() => hanldeSelectPrivacy(0)} ><div className='dialogGroupMenuPrivacy'> <RiGitRepositoryPrivateLine size={25} /> <span style={{ marginLeft: "20px" }}>Riêng tư</span></div></MenuItem>
                                        </Menu>

                                    </div>
                                </div>
                                <div className='dialogSettingGroupNameContainer'>
                                    <span className='dialogSettingGroupLabel'>Ảnh nhóm</span>
                                    <label onChange={handleChangeFiles} htmlFor='dialogSettingGroup' className='dialogSettingGroup'>
                                        <input hidden id='dialogSettingGroup' type="file" />
                                        <span >Tải ảnh lên</span>
                                    </label>
                                </div>
                                <div style={{ width: "100%", height: "200px" }}>

                                    {
                                        file ? <img style={{ width: "100%", height: "200px" }} src={file.preview} alt="" /> :
                                            <></>
                                    }

                                </div>
                                <div className='shareButtonContainer'>
                                    <button onClick={editInformationGroup} className="shareButton">Đồng ý</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default GroupPage;