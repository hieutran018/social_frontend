import './profile.css';
import authorUser from '../../lottiefiles/tick_blue.png';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Share from '../../components/share/Share';
import InforMationUser from '../../components/informationuser/informationuser';
import FriendList from '../../components/Friends/friendlist/friendlist';
import UpdateAvatar from '../../components/updateavatar/Updateavatar';
import Photos from '../../components/photos/photos';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusUser, selectUser } from '../../redux/selectors/postSelector';
import { fetchUser, updateCoverImage } from '../../redux/actions/userAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import { RxAvatar } from 'react-icons/rx/';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useCookies } from 'react-cookie';
import { fetchPostByUserId } from "../../redux/actions/postAction";
import { selectPost, selectPostStatus } from "../../redux/selectors/postSelector";
import axios from 'axios';


function Profile({ pusher }) {
    const navigate = useNavigate();
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const userCurrent = JSON.parse(localStorage.getItem('user'));
    const { page } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const status = useSelector(selectStatusUser);

    const statusPost = useSelector(selectPostStatus);
    const posts = useSelector(selectPost);

    useEffect(() => {
        dispatch(fetchPostByUserId(userId, 1));
    }, [cookies, dispatch, userId])

    const [openViewAvatar, setOpenViewAvatar] = useState(false);
    const [openUpdateAvatar, setOpenUpdateAvatar] = useState(false);
    const [uploadCover, setUploadCover] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenViewAvatar = () => {
        setAnchorEl(null);
        setOpenViewAvatar(true);
    }

    const handleCloseViewAvatar = () => {
        setOpenViewAvatar(false);
    }

    const handleOpenUpdateAvatar = () => {
        setAnchorEl(null);
        setOpenUpdateAvatar(true);
    }

    const handleCloseUpdateAvatar = () => {
        setOpenUpdateAvatar(false);
    }

    const handleChangeCoverImage = (e) => {
        setUploadCover(e.target.files)
    }

    const handleClickCancelUploadCoverImage = () => {
        setUploadCover(null);
    }

    const handleSubmitUpload = () => {
        dispatch(updateCoverImage(cookies, uploadCover))
        setUploadCover(null);
    }

    useEffect(() => {
        dispatch(fetchUser(cookies, userId));

    }, [userId, dispatch, cookies]);

    const handleClickChat = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/chats/create-chat';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                userId: userId
            },
            headers: {
                Authorization: "Bearer " + cookies
            }
        }).then((response) => {
            navigate('/chats/' + userId);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <>
            <Topbar pusher={pusher} />
            {
                status === 'loading' ?
                    <div></div> : status === 'success' ?
                        <div className="profile">
                            <div className="profileRight">
                                <div className="profileRightTop">
                                    <div className="profileCover">
                                        <div className='profileCoverContainer' style={{ height: '18rem' }}>
                                            <img
                                                className="profileCoverImg"
                                                src={!uploadCover ? (status === "loading" ? user.coverImage : user.coverImage) : URL.createObjectURL(uploadCover[0])}
                                                alt=""
                                            />

                                            {
                                                userCurrent.id.toString() === userId ?
                                                    <div className='profileCoverInput'>
                                                        {
                                                            uploadCover ? <div onClick={handleClickCancelUploadCoverImage} className='profileCoverCancel'>
                                                                <span >Hủy</span>
                                                            </div> : <></>
                                                        }
                                                        {
                                                            uploadCover ? <div onClick={handleSubmitUpload} htmlFor="profileUploadCover" className='profileCoverInput'>
                                                                <span >Lưu thay đổi</span>
                                                            </div> : <label htmlFor="profileUploadCover" className='profileCoverInput'>
                                                                <input onChange={handleChangeCoverImage} id="profileUploadCover" type="file" hidden />

                                                                <span >Cập nhật ảnh bìa</span>
                                                            </label>
                                                        }
                                                    </div> : <></>
                                            }

                                        </div>
                                        {
                                            userCurrent.id.toString() === userId ?
                                                <img
                                                    className="profileUserImg"
                                                    src={user.avatar}
                                                    alt=""

                                                    id="fade-button"
                                                    aria-controls={open ? 'fade-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                /> : <img
                                                    className="profileUserImg"
                                                    src={user.avatar}
                                                    alt=""
                                                />
                                        }


                                        <Menu
                                            id="fade-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}

                                            style={{
                                                left: '-30px'
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                        >
                                            <MenuItem onClick={handleOpenViewAvatar}>
                                                <div className='profileOptionAvatar'><RxAvatar size={30} />  <span className='profileOptionAvatarText'>Xem ảnh đại diện</span></div>
                                            </MenuItem>
                                            <MenuItem onClick={handleOpenUpdateAvatar}>
                                                <div className='profileOptionAvatar'><AiOutlineCloudUpload size={30} /><span className='profileOptionAvatarText'>Cập nhật ảnh đại diện</span></div>
                                            </MenuItem>

                                        </Menu>
                                    </div>
                                    <div className="profileInfo">
                                        <h4 className="profileInfoName">{user.displayName} {user.isVerified === 1 ? <img style={{ width: "24px", height: "24px" }} src={authorUser} alt="" /> : <></>}</h4>

                                        <div className='profileButtonActionContainer'>
                                            {
                                                userCurrent.id === user.id ?
                                                    <></> :
                                                    user.isFriend === true ? <button className='profileButtonAction profileActionAddFriend'>Hủy kết bạn</button> :
                                                        <button className='profileButtonAction profileActionAddFriend'>Kết bạn</button>
                                            }
                                            {
                                                userCurrent.id === user.id ? <></> :
                                                    <button onClick={handleClickChat} className='profileButtonAction profileActionSentMessage'>Nhắn tin</button>
                                            }

                                        </div>
                                    </div>



                                </div>
                                <div className='profileHr'></div>
                                <div className='profileTabBar'>

                                    <div className='profileTabBarButton'>
                                        <Link className='profileTextLink' to={"/userId/" + userId}><div className={page ? 'profileTab' : 'profileTab active'}> <span className='profileTextTab'>Bài viết</span></div></Link>
                                        <Link className='profileTextLink' to={"/userId/" + userId + "/about"}><div className={page === 'about' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Giới thiệu</span></div></Link>
                                        <Link className='profileTextLink' to={"/userId/" + userId + "/friends"}><div className={page === 'friends' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Bạn bè</span></div></Link>
                                        <Link className='profileTextLink' to={"/userId/" + userId + "/photos/photos_of"}><div className={page === 'photos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Ảnh</span></div> </Link>
                                        <Link className='profileTextLink' to={"/userId/" + userId + "/videos"}><div className={page === 'videos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Video</span></div></Link>
                                    </div>
                                </div>
                                {
                                    page === 'about' ?
                                        <div className="profileRightBottom"><InforMationUser user={user} /></div>

                                        : page === 'friends' ? <div className="profileRightBottom"> <FriendList /></div>
                                            : page === 'photos' ? <div className="profileRightBottom"> <Photos /></div>
                                                : page === 'videos' ? <div className="profileRightBottom"> <span>TAB VIDEOS</span></div>
                                                    :
                                                    <div className="profileRightBottom">
                                                        <div className='profileFeed'>
                                                            <Share />
                                                            {
                                                                statusPost === 'loading' ? <>LOADING</> :
                                                                    statusPost === 'succeeded' ? <Feed post={posts} /> :
                                                                        statusPost === 'failed' ? <>FAILED</> :
                                                                            <></>
                                                            }

                                                        </div>
                                                        <Rightbar profile={true} user={user} />
                                                    </div>
                                }
                            </div>
                            <Dialog
                                open={openViewAvatar}
                                onClose={handleCloseViewAvatar}
                                fullWidth
                                maxWidth="sm"
                            >
                                <div className='profileViewAvatarDialogContainer'>
                                    <img className='profileViewAvatarDialog' src={user.avatar} alt="" />
                                </div>
                            </Dialog>
                            <Dialog
                                open={openUpdateAvatar}
                                onClose={handleCloseUpdateAvatar}
                                fullWidth
                                maxWidth="sm"
                            >
                                <UpdateAvatar />
                            </Dialog>
                        </div > : <div></div>
            }
        </>
    );
}

export default Profile;