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
import { AiFillLike, AiOutlineLike, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
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
import { sharePostToWall, sharePostFormGroupToWall } from "../../redux/actions/postAction";
import { selectAddPostStatus } from "../../redux/selectors/postSelector";
import ShareOption from "../share/shareoptions/shareoption";
import axios from "axios";
import 'moment/locale/vi';
import likeImg from '../../rections/like.png';
import loveImg from '../../rections/love.png';
import yayImg from '../../rections/yay.png';
import wowImg from '../../rections/wow.png';
import sadImg from '../../rections/sad.png';
import hahaImg from '../../rections/haha.png';
import angryImg from '../../rections/angry.png';

import PostDetail from "../postdetail/postdetail";
import './post.css';
import { useParams } from "react-router-dom";
import ReactionsPost from "../reationspost/reactionspost";
import PostHistory from "../posthistory/posthistory";

function Post({ post }) {
    const pages = useParams().pages;
    const groupId = useParams().groupId;
    const cookies = useCookies('_tk');
    const [open, setOpen] = useState(false);
    const [openShareOptionToFeed, setOpenShareOptionToFeed] = useState(false)
    const [openViewImage, setopenViewImage] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const openOptionShare = Boolean(anchor);
    const [openViewHistory, setOpenViewHistory] = useState(false);
    const [item, setItem] = useState(0);
    const [anchorSetting, setAnchorSetting] = useState(null);
    const openSetting = Boolean(anchorSetting);
    const dispatch = useDispatch();
    const statusAdd = useSelector(selectAddPostStatus);
    const [isLike, setIsLike] = useState(post.isLike)
    const [like, setLike] = useState(!post.totalLike ? 0 : post.totalLike)
    const [share, setShare] = useState(!post.totalShare ? 0 : post.totalShare)
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
        setIsLike(!isLike)
        const requestURL = 'http://127.0.0.1:8000/api/v1/post/like-post';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                postId: post.id,
                reaction: reaction
            },
            headers: {
                Authorization: "Bearer " + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data.id);
            if (response.status === 200) {
                post.like.push(response.data);
                setLike(like + 1);
            } else if (response.status === 202) {
                post.like.filter((item) => item.id === parseInt(response.data.id) ? item.type = response.data.type : item.type)
            } else {
                setLike(like - 1);
            }

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
                                        <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
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
                                        {post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.iconPatch} alt="" /> <span className='postTagUser'>{post.iconName}</span></span> : ""}{post.parent_post ? <span className="postWithTextShare"> đã chia sẻ một bài viết</span> : ""} {post.tag.length === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.tag.length + " người khác"}</span></span>}
                                    </div>
                                    <div className="postPrivacy">
                                        <span className="postDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
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
                                <MenuItem onClick={handleOpenViewHistory}>
                                    <div className="postMenuSettingItem">
                                        <div className="postMenuSettingIcon">
                                            <GrHistory size={20} />
                                        </div>
                                        <div className="postMenuSettingTextContainer">
                                            <span className="postMenuSettingText">Xem lịch sử chỉnh sửa</span>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem >
                                    <div className="postMenuSettingItem">
                                        <div className="postMenuSettingIcon">
                                            <GrEdit size={20} />
                                        </div>
                                        <div className="postMenuSettingTextContainer">
                                            <span className="postMenuSettingText">Chỉnh sửa bài viết</span>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem >
                                    <div className="postMenuSettingItem">
                                        <div className="postMenuSettingIcon">
                                            <RiDeleteBin6Line size={20} />
                                        </div>
                                        <div className="postMenuSettingTextContainer">
                                            <span className="postMenuSettingText">Xóa bài viết</span>
                                        </div>
                                    </div>
                                </MenuItem>
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
                                                </ImageList> : post.totalMediaFile === 0 ? <></> : <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
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
                                                </ImageList>

                                    }</div>
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
                                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
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
                                                        </ImageList>
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
                                                                {post.parent_post.displayName} {post.parent_post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.parent_post.iconPatch} alt="" /> <span className='postTagUser'>{post.parent_post.iconName}</span></span> : ""} {post.parent_post.tag.length === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.parent_post.tag.length + " người khác"}</span></span>}
                                                            </a>
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
                            {post.like.map((reaction) => parseInt(reaction.type) === 1 ? <img key={reaction.id} className="postIconReactions" src={reactions[0].img} alt="" /> :
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
                        <div className="postBottomButton"> {openReactions ? <ReactionsPost handleReactions={handleLike} onMouseOver={handleOpenReactions} /> : <></>}<button onMouseOver={handleOpenReactions} className="btn ">{isLike ? <AiFillLike size={25} /> : <AiOutlineLike size={25} />} </button></div>
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
                    <PostDetail post={post} like={like} share={share} />
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
                    <div className="dialogViewMediaFile">
                        <div style={{ margin: 'auto' }}>
                            {
                                post.totalMediaFile === 1 ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div className="dialogButton"><ArrowBackIosNewIcon /></div> {post.mediafile[0].media_type === 'mp4' ? <video loop className="dialogViewImage" src={post.mediafile[0].media_file_name} controls></video> :
                                    <img className="dialogViewImage" src={post.mediafile[0].media_file_name} alt="" srcSet={post.mediafile[0].media_file_name} />}<div className="dialogButton"><ArrowForwardIosIcon /></div> </div>
                                    : post.totalMediaFile === 0 ? <div></div> : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div onClick={handlePreMediaItem} className="dialogButton"><ArrowBackIosNewIcon /></div> {post.mediafile[item].media_type === 'mp4' ? <video loop className="dialogViewImage" src={post.mediafile[item].media_file_name} controls></video> :
                                        <img className="dialogViewImage" src={post.mediafile[item].media_file_name} alt="" srcSet={post.mediafile[item].media_file_name} />}<div onClick={handleNextMediaItem} className="dialogButton"><ArrowForwardIosIcon /></div> </div>
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
        </div>
    );
}

export default Post;