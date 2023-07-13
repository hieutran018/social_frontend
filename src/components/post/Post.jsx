import React, { useEffect } from "react";
import { useState } from "react";
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { GoReport } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { GrHistory, GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FeedIcon from '@mui/icons-material/Feed';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { sharePostToWall, sharePostFormGroupToWall, deletePost } from "../../redux/actions/postAction";
import { selectAddPostStatus } from "../../redux/selectors/postSelector";
import ShareOption from "../share/shareoptions/shareoption";
import 'moment/locale/vi';
import likeImg from '../../rections/like.png';
import loveImg from '../../rections/love.png';
import yayImg from '../../rections/yay.png';
import wowImg from '../../rections/wow.png';
import sadImg from '../../rections/sad.png';
import hahaImg from '../../rections/haha.png';
import angryImg from '../../rections/angry.png';
import authorUser from '../../lottiefiles/tick_blue.png';
import PostDetail from "../postdetail/postdetail";
import './post.css';
import { useParams } from "react-router-dom";
import ReactionsPost from "../reationspost/reactionspost";
import PostHistory from "../posthistory/posthistory";
import EditPost from "../editpost/editpost";
import ReactionButton from "../reaction/reaction";
import Reports from "../reports/reports";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../auth/auth";

function Post({ post }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const pages = useParams().pages;
    const groupId = useParams().groupId;
    const cookies = useCookies('_tk');
    const [open, setOpen] = useState(false);
    const [openShareOptionToFeed, setOpenShareOptionToFeed] = useState(false)
    const [openViewImage, setopenViewImage] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const openOptionShare = Boolean(anchor);
    const [openViewHistory, setOpenViewHistory] = useState(false);
    const [openEditPost, setOpenEditPost] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [item, setItem] = useState(0);
    const [anchorSetting, setAnchorSetting] = useState(null);
    const openSetting = Boolean(anchorSetting);
    const dispatch = useDispatch();
    const statusAdd = useSelector(selectAddPostStatus);
    const [isLike, setIsLike] = useState(post.isLike)
    const [like, setLike] = useState(!post.totalLike ? 0 : post.totalLike)
    const [share, setShare] = useState(!post.totalShare ? 0 : post.totalShare)
    const [reacts, setReaction] = useState(post.like);
    const [openReactions, setOpenReactions] = useState(false);
    const reactions = [
        { id: 1, img: likeImg },
        { id: 2, img: loveImg },
        { id: 3, img: sadImg },
        { id: 4, img: hahaImg },
        { id: 5, img: yayImg },
        { id: 6, img: wowImg },
        { id: 7, img: angryImg },
    ]
    useEffect(() => {
        if (selectAddPostStatus) {
            setOpenShareOptionToFeed(false);
            setAnchor(null);
        }
    }, [statusAdd, dispatch])

    const handleLike = (reaction) => {
        // const requestURL = 'https://ckcsocial.site/api/v1/post/like-post';
        baseURL.post('/api/v1/post/like-post', {
            postId: post.id,
            reaction: reaction
        }, {
            headers: {
                Authorization: "Bearer " + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            if (response.status === 200) {
                setReaction([...reacts, response.data]);
                setIsLike(response.data);
                setLike(like + 1);
            } else if (response.status === 202) {
                setReaction(post.like.map((item) => {
                    if (parseInt(item.id) === parseInt(response.data.id)) {
                        return item = response.data;
                    }
                }))
                setIsLike(response.data)
                console.log(reacts, "CURRENT UPDATE")
            } else if (response.status === 201) {
                setReaction(reacts.filter((item) => item.id !== parseInt(response.data.id)));
                setIsLike(null);
                setLike(like - 1);
            }
            console.log(reaction, isLike);
        }).catch((error) => console.log(error));
    }

    const handleOpenReactions = () => {
        setOpenReactions(true);
    }
    const handleCloseReactions = () => {
        setOpenReactions(false);
    }

    const handleClickOpenopenShareOptionToFeed = () => {
        setOpenShareOptionToFeed(true);
    };
    const handleCloseopenShareOptionToFeed = () => {
        setOpenShareOptionToFeed(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenViewHistory = () => {
        setOpenViewHistory(true);
        setAnchorSetting(null);
    }
    const handleCloseViewHistory = () => {
        setOpenViewHistory(false);
    }
    const handleOpenEditPost = () => {
        setOpenEditPost(true);
        setAnchorSetting(null);
    }
    const handleCloseEditPost = () => {
        setOpenEditPost(false);
    }

    const handleClickOptionShare = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleCloseOptionShare = () => {
        setAnchor(null);
    };
    const handleClickSetting = (event) => {
        setAnchorSetting(event.currentTarget);
    };
    const handleCloseSetting = () => {
        setAnchorSetting(null);
    };

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    const handleOpenReport = () => {
        setOpenReport(true);
        setAnchorSetting(null);
    }
    const handleCloseReport = () => {
        setOpenReport(false);
    }

    const handleClickSharePost = () => {
        if (pages === 'group' && groupId) {
            dispatch(sharePostFormGroupToWall(post, cookies, null, 1))
        } else {
            dispatch(sharePostToWall(post, cookies, null, 1))
        }
        setShare(share + 1)
        setAnchor(null);
    }

    const handleOpenViewMedia = () => {
        setopenViewImage(true);
        setItem(0);
    }

    const handleCloseViewMedia = () => {
        setopenViewImage(false);
    }

    const handleNextMediaItem = () => {
        if (post.totalMediaFile - 1 === item) {
            setItem(0);
        }
        else {
            setItem(item + 1)
        }
    }
    const handlePreMediaItem = () => {
        if (item === 0) {
            setItem(post.totalMediaFile - 1);
        }
        else {
            setItem(item - 1)
        }
    }
    const handleDeletePost = () => {
        dispatch(deletePost(cookies[0]._tk, post.id))
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    {
                        post.group_id ?
                            <div className="postTopLeft">
                                <a href={"/" + post.group_id}>
                                    <img
                                        className="postProfileImgGroup"
                                        src={post.groupAvatar}
                                        alt={"Avatar user " + post.groupName}
                                    />
                                </a>
                                <div>
                                    <span className="postUsername">
                                        <a className="postLinkProfileUser" href={"/userId/" + post.user_id}>
                                            {post.groupName}
                                        </a>
                                    </span>
                                    <div className="postPrivacy">
                                        <span className="postMemberGroup">
                                            <a className="postLinkProfileMemberGroup" href={"/userId/" + post.user_id}>
                                                {post.displayName}
                                            </a>
                                        </span>
                                        <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD H:mm:ss').fromNow()}
                                            {post.privacy.toString() === "0" ?
                                                <LockIcon className="postIconPrivacy" /> :
                                                post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                    : <GroupIcon className="postIconPrivacy" />
                                            }</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="postTopLeft">
                                <a href={"/userId/" + post.user_id}>
                                    <img
                                        className="postProfileImg"
                                        src={post.avatarUser}
                                        alt={"Avatar user " + post.displayName}
                                    />
                                </a>
                                <div>
                                    <div className="postUsername">
                                        <a className="postLinkProfileUser" href={"/userId/" + post.user_id}>
                                            {post.displayName}
                                        </a>
                                        {post.isVerified === 1 ? <img style={{ width: "24px", height: "24px" }} src={authorUser} alt="" /> : <></>}
                                        {post.iconName ? <span className='postWithText'> đang cảm thấy <img width={20} height={20} src={post.iconPatch} alt="" /> <span className='postTagUser'>{post.iconName} </span></span> : ""}{post.parent_post ? <span className="postWithTextShare"> đã chia sẻ một bài viết</span> : ""} {post.tag.length === 0 ? "" : <span className="postWithText"> <span style={{ marginLeft: '0.3rem' }}> cùng với </span> <span className="postTagUser">{post.tag.length + " người khác"}</span></span>}
                                    </div>
                                    <div className="postPrivacy">
                                        <span className="postDate">{moment(post.created_at, 'YYYYMMDD H:mm:ss').fromNow()}
                                            {post.privacy.toString() === "0" ?
                                                <LockIcon className="postIconPrivacy" /> :
                                                post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                    : <GroupIcon className="postIconPrivacy" />
                                            }</span>
                                    </div>
                                </div>
                            </div>
                    }
                    <div className="postTopRight">
                        <div onClick={handleClickSetting} className="postIconOptionPost">
                            <HiOutlineDotsHorizontal size={25} />
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorSetting}
                            open={openSetting}
                            onClose={handleCloseSetting}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <div className="postMenuSetting">
                                {
                                    parseInt(post.histories) !== 0 ?
                                        <MenuItem onClick={handleOpenViewHistory}>
                                            <div className="postMenuSettingItem">
                                                <div className="postMenuSettingIcon">
                                                    <GrHistory size={20} />
                                                </div>
                                                <div className="postMenuSettingTextContainer">
                                                    <span className="postMenuSettingText">Xem lịch sử chỉnh sửa</span>
                                                </div>
                                            </div>
                                        </MenuItem> :
                                        <></>
                                }
                                {
                                    parseInt(post.user_id) === user.id ?
                                        <MenuItem onClick={handleOpenEditPost}>
                                            <div className="postMenuSettingItem">
                                                <div className="postMenuSettingIcon">
                                                    <GrEdit size={20} />
                                                </div>
                                                <div className="postMenuSettingTextContainer">
                                                    <span className="postMenuSettingText">Chỉnh sửa bài viết</span>
                                                </div>
                                            </div>
                                        </MenuItem> :
                                        <></>
                                }
                                {
                                    parseInt(post.user_id) === user.id ?
                                        <MenuItem onClick={handleDeletePost}>
                                            <div className="postMenuSettingItem">
                                                <div className="postMenuSettingIcon">
                                                    <RiDeleteBin6Line size={20} />
                                                </div>
                                                <div className="postMenuSettingTextContainer">
                                                    <span className="postMenuSettingText">Xóa bài viết</span>
                                                </div>
                                            </div>
                                        </MenuItem> :
                                        <></>
                                }
                                {
                                    parseInt(post.user_id) !== user.id ?
                                        <MenuItem onClick={handleOpenReport}>
                                            <div className="postMenuSettingItem">
                                                <div className="postMenuSettingIcon">
                                                    <GoReport size={20} />
                                                </div>
                                                <div className="postMenuSettingTextContainer">
                                                    <span className="postMenuSettingText">Báo cáo bài viết</span>
                                                </div>
                                            </div>
                                        </MenuItem> :
                                        <></>
                                }
                            </div>
                        </Menu>
                    </div>
                </div>
                <div className="postCenter">
                    {
                        post.parent_post ? <ShowMoreText
                            /* Default options */
                            lines={1}
                            more="xem thêm"
                            less="ẩn bớt"
                            className="postText"
                            anchorClass="postViewMore"
                            onClick={executeOnClick}
                            expanded={false}
                            truncatedEndingComponent={"... "}
                        ><p>{post.post_content}</p>
                        </ShowMoreText> : <div></div>
                    }
                    {
                        !post.parent_post ?
                            <div>
                                <ShowMoreText
                                    lines={1}
                                    more="xem thêm"
                                    less="ẩn bớt"
                                    className="postText"
                                    anchorClass="postViewMore"
                                    onClick={executeOnClick}
                                    expanded={false}
                                    truncatedEndingComponent={"... "}
                                ><p>{post.post_content}</p>
                                </ShowMoreText>
                                <div onClick={handleOpenViewMedia}>
                                    {post.totalMediaFile === 1 ?
                                        <div>
                                            {
                                                post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.mediafile[0].media_file_name} controls></video> :
                                                    <img className="postImg" src={post.mediafile[0].media_file_name} alt="" srcSet={post.mediafile[0].media_file_name} />
                                            }
                                        </div>
                                        : post.totalMediaFile === 2 ?
                                            <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
                                                {post.mediafile.map((item) => (
                                                    <ImageListItem key={item.media_file_name}>
                                                        {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={item.title}
                                                            loading="lazy"
                                                        />}
                                                    </ImageListItem>
                                                ))}
                                            </ImageList> : post.totalMediaFile === 3 ?
                                                <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                    {post.mediafile.map((item) => (
                                                        <ImageListItem key={item.media_file_name}>
                                                            {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />}
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> : post.totalMediaFile === 4 ? <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                    {post.mediafile.map((item) => (
                                                        <ImageListItem key={item.media_file_name}>
                                                            {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                alt={item.title}
                                                                loading="lazy"
                                                            />}
                                                        </ImageListItem>
                                                    ))}
                                                </ImageList> :
                                                    post.totalMediaFile > 4 ?
                                                        <div className="postMediaFileContainerItemList">
                                                            <img className="postMediFileItemsList" src={post.mediafile[0].media_file_name} alt="" />
                                                            <img className="postMediFileItemsList" src={post.mediafile[1].media_file_name} alt="" />
                                                            <img className="postMediFileItemsList" src={post.mediafile[2].media_file_name} alt="" />
                                                            <div className="postMediaFileItemsListCount">
                                                                <div className="postMediaFileCountItemsList"><span className="postMediFileCountItem">+{post.totalMediaFile - 3}</span></div>
                                                                <img className="postMediFileItemsList" src={post.mediafile[3].media_file_name} alt="" />
                                                            </div>
                                                        </div>
                                                        : <></>
                                    }</div>
                            </div> :
                            post.parent_post === 1 ?
                                <div className="postParent">
                                    <div className="postShareWrapper">
                                        <div className="postShareIsDeleteContenTitle">Nội dung này hiện không có sẵn.</div>
                                        <div className="postShareIsDeleteContentDescription">
                                            Khi điều này xảy ra, thường là do chủ sở hữu chỉ chia sẻ nội dung đó với một nhóm nhỏ người hoặc thay đổi người có thể xem hoặc nội dung đó đã bị xóa.
                                        </div>
                                    </div>
                                </div> :
                                <div className="postParent">
                                    <div className="postShareWrapper">
                                        <div className="postShareCenter">
                                            <div onClick={handleOpenViewMedia}>
                                                {post.parent_post.totalMediaFile === 1 ?
                                                    <div>
                                                        {
                                                            post.parent_post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.parent_post.mediafile[0].media_file_name} controls></video> :
                                                                <img className="postShareImg" src={post.parent_post.mediafile[0].media_file_name} alt="" />
                                                        }
                                                    </div>
                                                    : post.parent_post.totalMediaFile === 2 ?
                                                        <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
                                                            {post.parent_post.mediafile.map((item) => (
                                                                <ImageListItem key={item.media_file_name}>
                                                                    {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />}
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList> : post.parent_post.totalMediaFile === 3 ?
                                                            <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                                {post.parent_post.mediafile.map((item) => (
                                                                    <ImageListItem key={item.media_file_name}>
                                                                        {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                            alt={item.title}
                                                                            loading="lazy"
                                                                        />}
                                                                    </ImageListItem>
                                                                ))}
                                                            </ImageList> :
                                                            post.parent_post.totalMediaFile === 4 ? <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                                {post.parent_post.mediafile.map((item) => (
                                                                    <ImageListItem key={item.media_file_name}>
                                                                        {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                            alt={item.title}
                                                                            loading="lazy"
                                                                        />}
                                                                    </ImageListItem>
                                                                ))}
                                                            </ImageList> :
                                                                post.parent_post.totalMediaFile > 4 ?
                                                                    <div className="postParentMediaFileContainerItemList">
                                                                        <img className="postParentMediFileItemsList" src={post.parent_post.mediafile[0].media_file_name} alt="" />
                                                                        <img className="postParentMediFileItemsList" src={post.parent_post.mediafile[1].media_file_name} alt="" />
                                                                        <img className="postParentMediFileItemsList" src={post.parent_post.mediafile[2].media_file_name} alt="" />
                                                                        <div className="postParentMediaFileItemsListCount">
                                                                            <div className="postParentMediaFileCountItemsList"><span className="postParentMediFileCountItem">+{post.parent_post.totalMediaFile - 3}</span></div>
                                                                            <img className="postParentMediFileItemsList" src={post.parent_post.mediafile[3].media_file_name} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    : <></>
                                                }
                                            </div>
                                        </div>
                                        <div className="postShareTop">
                                            {
                                                post.parent_post.group_id ?
                                                    <div className="postTopLeft">
                                                        <a href={"/" + post.parent_post.group_id}>
                                                            <img
                                                                className="postProfileImgGroup"
                                                                src={post.parent_post.groupAvatar}
                                                                alt={"Avatar user " + post.parent_post.groupName}
                                                            />
                                                        </a>
                                                        <div>
                                                            <span className="postUsername">
                                                                <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                    {post.parent_post.groupName}
                                                                </a>
                                                            </span>
                                                            <div className="postPrivacy">
                                                                <span className="postMemberGroup">
                                                                    <a className="postLinkProfileMemberGroup" href={"/userId/" + post.parent_post.user_id}>
                                                                        {post.parent_post.displayName}
                                                                    </a>
                                                                </span>
                                                                <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                    {post.parent_post.privacy.toString() === "0" ?
                                                                        <LockIcon className="postIconPrivacy" /> :
                                                                        post.parent_post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                                            : <GroupIcon className="postIconPrivacy" />
                                                                    }</span>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="postTopLeft">
                                                        <a href={"/userId/" + post.parent_post.user_id}>
                                                            <img
                                                                className="postProfileImg"
                                                                src={post.parent_post.avatarUser}
                                                                alt={"Avatar user " + post.parent_post.displayName}
                                                            />
                                                        </a>
                                                        <div>
                                                            <div className="postUsername">
                                                                <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                    {post.parent_post.displayName}
                                                                </a>
                                                                {post.parent_post.isVerified === 1 ? <img style={{ width: "24px", height: "24px" }} src={authorUser} alt="" /> : <></>} {post.parent_post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.parent_post.iconPatch} alt="" /> <span className='postTagUser'>{post.parent_post.iconName}</span></span> : ""} {parseInt(post.parent_post.tag.length) === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.parent_post.tag.length + " người khác"}</span></span>}
                                                            </div>
                                                            <div className="postPrivacy">
                                                                <span className="postshareDate">{moment(post.parent_post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                    {post.parent_post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.parent_post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : <GroupIcon className="postIconPrivacy" />}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                        <div>
                                            <ShowMoreText
                                                /* Default options */
                                                lines={1}
                                                more="xem thêm"
                                                less="ẩn bớt"
                                                className="postText"
                                                anchorClass="postViewMore"
                                                onClick={executeOnClick}
                                                expanded={false}
                                                truncatedEndingComponent={"... "}
                                            ><p>{post.parent_post.post_content}</p>
                                            </ShowMoreText>
                                        </div>
                                    </div>
                                </div>
                    }
                </div>
                <div className="postBottomStatistical">
                    <span className="postTextStatistical">
                        <div className="postIconReacactionsContainer">
                            {reacts.map((reaction) => parseInt(reaction.type) === 1 ? <img key={reaction.id} className="postIconReactions" src={reactions[0].img} alt="" /> :
                                parseInt(reaction.type) === 2 ? <img key={reaction.id} className="postIconReactions" src={reactions[1].img} alt="" /> : reaction.type === 7 ? <img className="postIconReactions" src={reactions[0].img} alt="" /> :
                                    parseInt(reaction.type) === 3 ? <img key={reaction.id} className="postIconReactions" src={reactions[2].img} alt="" /> :
                                        parseInt(reaction.type) === 4 ? <img key={reaction.id} className="postIconReactions" src={reactions[3].img} alt="" /> :
                                            parseInt(reaction.type) === 5 ? <img key={reaction.id} className="postIconReactions" src={reactions[4].img} alt="" /> :
                                                parseInt(reaction.type) === 6 ? <img key={reaction.id} className="postIconReactions" src={reactions[5].img} alt="" /> :
                                                    <img key={reaction.id} className="postIconReactions" src={reactions[6].img} alt="" />)}
                        </div>
                        <span className="postTextDescriptionReactions">{like === 0 ? "" : like}</span>
                    </span>
                    <div className="postTextStatistical">
                        <span className="postTextStatistical statisticalComment">{post.totalComment === 0 || !post.totalComment ? "" : post.totalComment + " bình luận"}</span>
                        <span className="postTextStatistical">{share === 0 ? "" : share + " lượt chia sẻ"}</span>
                    </div>
                </div>
                <div onMouseLeave={handleCloseReactions} className="postBottom">
                    <div className="postBottomLeft">
                        <div className="postBottomButton"> {openReactions ? <ReactionsPost handleReactions={handleLike} onMouseOver={handleOpenReactions} /> : <></>}<button onMouseOver={handleOpenReactions} className="btn ">{isLike ? <ReactionButton reaction={isLike} /> : <AiOutlineLike size={25} />} </button></div>
                        <div className="postBottomButton"><button onClick={() => handleClickOpen()} className="btn "><AiOutlineComment size={25} /></button></div>
                        <div className="postBottomButton"><button onClick={handleClickOptionShare} className="btn "><AiOutlineShareAlt size={25} /></button></div>
                    </div>
                </div>
            </div>
            <div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={openOptionShare}
                    onClose={handleCloseOptionShare}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className="shareOptionsMenuItems">
                        <MenuItem onClick={() => handleClickSharePost()} >
                            <div className="shareOptionsItem">
                                <div className="shareOptionsIcon">
                                    <ReplyIcon />
                                </div>
                                <div className="shareOptionsTextContainer">
                                    <span className="shareOptionsText">Chia sẻ ngay (Công khai)</span>
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem onClick={handleClickOpenopenShareOptionToFeed}>
                            <div className="shareOptionsItem">
                                <div className="shareOptionsIcon">
                                    <FeedIcon />
                                </div>
                                <div className="shareOptionsTextContainer">
                                    <span className="shareOptionsText">Chia sẻ lên dòng thời gian</span>
                                </div>
                            </div>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                >
                    <PostDetail post={post} isLiked={isLike} like={like} likes={reacts} share={share} close={handleClose} reaction={handleLike} />
                </Dialog>
                <Dialog
                    open={openShareOptionToFeed}
                    onClose={handleCloseopenShareOptionToFeed}
                    fullWidth
                    maxWidth="md"
                >
                    <ShareOption post={post.parent_post !== null ? post.parent_post : post} />
                </Dialog>
                <Dialog
                    open={openViewImage}
                    onClose={handleCloseViewMedia}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle style={{ padding: "0px", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "10%" }}></div>
                        <div className='contaierHeader'>
                            <span className='shareTitle'>Ảnh từ bài viết của {post.displayName}</span>
                        </div>
                        <div style={{ width: "10%", display: "flex", justifyContent: "end", alignItems: "center" }}>
                            <div onClick={handleCloseViewMedia} className="dialoPostButtonClose">
                                <IconButton className="buttonClose" aria-label="delete" size="medium">
                                    <ClearIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    </DialogTitle>
                    <div className="dialogViewMediaFile">
                        <div style={{ margin: 'auto' }}>
                            {
                                post.totalMediaFile === 1 ?
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="dialogButton">
                                            <ArrowBackIosNewIcon />
                                        </div>
                                        {post.mediafile[0].media_type === 'mp4' ?
                                            <video loop className="dialogViewImage" src={post.mediafile[0].media_file_name} controls></video> :
                                            <img className="dialogViewImage" src={post.mediafile[0].media_file_name} alt="" srcSet={post.mediafile[0].media_file_name} />}
                                        <div className="dialogButton">
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                    : post.totalMediaFile === 0 ? <div></div> :
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div onClick={handlePreMediaItem} className="dialogButton">
                                                <ArrowBackIosNewIcon />
                                            </div>
                                            {
                                                post.mediafile[item].media_type === 'mp4' ?
                                                    <div style={{ width: "45rem", display: "flex", justifyContent: "center", padding: "1rem" }}>
                                                        <video loop className="dialogViewImage" src={post.mediafile[item].media_file_name} controls></video>
                                                    </div> :
                                                    <div style={{ width: "45rem", display: "flex", justifyContent: "center", padding: "1rem" }}>
                                                        <img className="dialogViewImage" src={post.mediafile[item].media_file_name} alt="" srcSet={post.mediafile[item].media_file_name} />
                                                    </div>
                                            }
                                            <div onClick={handleNextMediaItem} className="dialogButton">
                                                <ArrowForwardIosIcon />
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>
                </Dialog>
            </div>
            <div className="postViewPostHistory">
                <Dialog
                    open={openViewHistory}
                    onClose={handleCloseViewHistory}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle style={{ padding: "0px" }}>
                        <div className='contaierHeader'>
                            <span className='shareTitle'>Lịch sử chỉnh sửa bài viết</span>
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ padding: "0px" }}>
                        <PostHistory postId={post.id} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="postEditPost">
                <Dialog
                    open={openEditPost}
                    onClose={handleCloseEditPost}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle style={{ padding: "0px" }}>
                        <div className='contaierHeader'>
                            <span className='shareTitle'>Chỉnh sửa bài viết</span>
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ padding: "0px" }}>
                        <EditPost postId={post.id} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="postReport">
                <Dialog
                    open={openReport}
                    onClose={handleCloseReport}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle style={{ padding: "0px" }}>
                        <div className='contaierHeader'>
                            <span className='shareTitle'>Báo cáo bài viết</span>
                        </div>
                    </DialogTitle>
                    <DialogContent style={{ padding: "0px" }}>
                        <Reports postId={post.id} close={handleCloseReport} />
                    </DialogContent>
                </Dialog>
            </div>
            <ToastContainer
                style={{ borderRadius: "5px", width: "400px" }}
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Post;