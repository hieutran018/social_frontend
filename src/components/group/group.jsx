import './group.css';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { MdOutlinePublic } from 'react-icons/md';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Share from '../share/Share';
import Feed from '../feed/Feed';
import { useCookies } from 'react-cookie';
import axios from 'axios';


function GroupPage({ group }) {

    const cookies = useCookies('_tk')[0]._tk;
    // const user = JSON.parse(localStorage.getItem('user'));
    const [open, setOpen] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [friends, setFriends] = useState([]);
    const [privacy, setPrivacy] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [groupName, setGroupName] = useState('');
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

    }

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



        }).catch((error) => console.log(error.message));
    }

    function editInformationGroup() {
        const requestURL = 'http://127.0.0.1:8000/api/v1/edit-information-group';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                groupId: group.id, groupName: groupName, privacy: privacy
            },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log(response.data)




        }).catch((error) => console.log(error.message));
    }

    function sendInviteJoinGroup(userId) {
        const requestUrl = 'http://127.0.0.1:8000/api/v1/send-invite-to-group';
        axios({
            method: 'POST',
            url: requestUrl,
            data: {
                userId: userId, groupId: group.id
            },
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => console.log(response.data)).catch((error) => console.log(error.message));
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
                    <div onClick={handleClickOpenSetting} className='groupPageSetting'>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <BiDotsHorizontalRounded />
                        </div>
                    </div>
                </div>

            </div>
            <hr className="sidebarHr" />
            <div className='groupPageTabMenu'>
                <div className='groupPageMenuTab avtiveTab'><span className='groupPageMenuTabText'>Bài viết</span></div>
                <div className='groupPageMenuTab'><span className='groupPageMenuTabText'>Mọi người</span></div>
                <div className='groupPageMenuTab'><span className='groupPageMenuTabText'>Bài viết</span></div>
                <div className='groupPageMenuTab'><span className='groupPageMenuTabText'>File phương tiện</span></div>
            </div>
            <div className='groupPageMainContainer'>
                <div className='groupPageFeeds'>
                    <Share />
                    <Feed />
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
                            <span className='groupPageIntroduce'> File phương tiện được chia sẻ</span>
                        </div>
                        <div className='groupPageMediFileGroupMainContainer'>

                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
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
                                        <ListItem>
                                            <img className='dialogGroupInviteFriendAvatar' src={friend.avatar} alt="" />
                                            <ListItemText className='dialogGroupInviteFriendName' primary={friend.username} secondary="" />
                                            <div onClick={() => sendInviteJoinGroup(friend.friendId)} className='dialogSendInviteGroupButton'>
                                                <div className='dialogSendInviteGroup'>Mời bạn bè</div>
                                            </div>
                                        </ListItem>
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
                                        <input onChange={handleChangeGroupName} className='dialogSettingInputGroupName' type="text" />
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
                                        <input multiple hidden id='dialogSettingGroup' type="file" />
                                        <span >Tải ảnh lên</span>
                                    </label>
                                </div>
                                <div style={{ width: "100%", height: "200px" }}>

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