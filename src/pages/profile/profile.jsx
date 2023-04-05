import './profile.css';
import { useParams, Link } from 'react-router-dom';
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
import { fetchUser } from '../../redux/actions/userAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import { RxAvatar } from 'react-icons/rx/';
import { AiOutlineCloudUpload } from 'react-icons/ai';


function Profile() {
    const { userId } = useParams();
    const userCurrent = JSON.parse(localStorage.getItem('user'));
    const { page } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const status = useSelector(selectStatusUser);

    const [openViewAvatar, setOpenViewAvatar] = useState(false);
    const [openUpdateAvatar, setOpenUpdateAvatar] = useState(false);
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

    useEffect(() => {
        dispatch(fetchUser(userId));

    }, [userId, dispatch]);



    return (
        <>
            <Topbar />
            {
                status === 'loading' ?
                    <div></div> : status === 'success' ?
                        <div className="profile">

                            <div className="profileRight">
                                <div className="profileRightTop">
                                    <div className="profileCover">
                                        <img
                                            className="profileCoverImg"
                                            src={status === "loading" ? user.coverImage : user.coverImage}
                                            alt=""
                                        />

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
                                            transformOrigin={{
                                                horizontal: 'bottom',

                                                vertical: 'left'
                                            }}
                                            style={{
                                                left: '-15px'
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            anchorOrigin={{
                                                vertical: 'bottom',

                                            }}

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
                                        <h4 className="profileInfoName">{user.username}</h4>
                                        <span className="profileInfoDesc">Hi</span>
                                    </div>

                                </div>
                                <div className='profileHr'></div>
                                <div className='profileTabBar'>

                                    <div className='profileTabBarButton'>
                                        <Link className='profileTextLink' to={"/" + userId}><div className={page ? 'profileTab' : 'profileTab active'}> <span className='profileTextTab'>Bài viết</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/about"}><div className={page === 'about' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Giới thiệu</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/friends"}><div className={page === 'friends' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Bạn bè</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/photos/photos_of"}><div className={page === 'photos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Ảnh</span></div> </Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/videos"}><div className={page === 'videos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Video</span></div></Link>
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
                                                            <Feed />
                                                        </div>
                                                        <Rightbar profile userProfile={user} />
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
                        </div> : <div></div>
            }


        </>
    );
}

export default Profile;