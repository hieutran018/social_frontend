import React from "react";
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Comment from "../comment/comment";
import CommentBox from "../commentbox/commentbox";

import 'moment/locale/vi';
import { useState } from "react";
import './post.css';


function Post({ post }) {
    const navigate = useNavigate();
    // const [like, setLike] = useState(post.like)
    // const [isLiked, setIsLiked] = useState(false)

    // const likeHandler = () => {
    //     setLike(isLiked ? like - 1 : like + 1)
    //     setIsLiked(!isLiked)
    // }
    const [commentList, setCommentList] = useState([]);

    const [open, setOpen] = React.useState(false);


    async function fetchCommentByIdPost(postId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: postId })
        };
        const requestURL = "http://127.0.0.1:8000/api/fetch-comment-by-post";
        const response = await fetch(requestURL, requestOptions);
        const responseJson = await response.json();
        setCommentList(responseJson);
    }
    const handleClickOpen = (postId) => {
        setOpen(true);
        fetchCommentByIdPost(postId);

    };
    const handleClose = () => {
        setOpen(false);

    };
    const viewProfileUser = (userId) => {
        const url = "/" + userId;
        navigate(url);

    }
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div onClick={() => viewProfileUser(post.user_id)} className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={post.avatarUser}
                            alt={"Avatar user " + post.username}
                        />
                        <span className="postUsername">
                            {post.username}
                        </span>

                    </div>
                </div>
                <div className="postPrivacy">
                    <span className="postDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                        {post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : post.privacy === 2 ? <GroupIcon className="postIconPrivacy" /> : <PersonRemoveIcon className="postIconPrivacy" />}</span>
                </div>
                <div className="postCenter">
                    <ShowMoreText
                        /* Default options */
                        lines={3}
                        more="xem thêm"
                        less="ẩn bớt"
                        className="postText"
                        anchorClass="postViewMore"
                        onClick={executeOnClick}
                        expanded={false}
                        truncatedEndingComponent={"... "}
                    >{post.post_content}
                    </ShowMoreText>
                    {post.totalMediaFile === 1 ?
                        <div>
                            <img className="postImg" src={post.mediafile[0].media_file_name} alt="" />
                        </div>
                        : post.totalMediaFile === 2 ?
                            <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                {post.mediafile.map((item) => (
                                    <ImageListItem key={item.media_file_name}>
                                        <img
                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList> : post.totalMediaFile === 3 ?
                                <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                    {post.mediafile.map((item) => (
                                        <ImageListItem key={item.media_file_name}>
                                            <img
                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList> :
                                <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                    {post.mediafile.map((item) => (
                                        <ImageListItem key={item.media_file_name}>
                                            <img
                                                src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>}
                </div>
                <div className="postBottomStatistical">
                    <span className="postTextStatistical">20k lượt thích</span>
                    <div>
                        <span className="postTextStatistical statisticalComment">20k bình luận</span>
                        <span className="postTextStatistical">20k lượt chia sẻ</span>
                    </div>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div className="postBottomButton"><button className="btn ">Thích </button></div>
                        <div className="postBottomButton"><button onClick={() => handleClickOpen(post.id)} className="btn ">Bình luận</button></div>
                        <div className="postBottomButton"><button className="btn ">Chia sẻ</button></div>
                        {/* <span className="postLikeCounter">{like}</span> */}
                    </div>

                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                >
                    <div className="dialogPost">
                        <div>
                            <div className="postTitle">
                                <div style={{ width: "10%" }}></div>
                                <div>
                                    <span className="postTitleDialog">Bài viết của {post.username}</span>
                                </div>
                                <div className="dialoPostButtonClose" style={{ width: "10%" }}>
                                    <IconButton className="buttonClose" aria-label="delete" size="large">
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                        <div className="postWrapper">
                            <div className="postTop">
                                <div className="postTopLeft">
                                    <img
                                        className="postProfileImg"
                                        src={post.avatarUser}
                                        alt=""
                                    />
                                    <span className="postUsername">
                                        {post.username}
                                    </span>

                                </div>

                            </div>
                            <div className="postPrivacy">
                                <span className="postDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                    {post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : post.privacy === 2 ? <GroupIcon className="postIconPrivacy" /> : <PersonRemoveIcon className="postIconPrivacy" />}</span>
                            </div>
                            <div className="postCenter">
                                <ShowMoreText
                                    /* Default options */
                                    lines={3}
                                    more="xem thêm"
                                    less="ẩn bớt"
                                    className="postText"
                                    anchorClass="postViewMore"
                                    onClick={executeOnClick}
                                    expanded={false}
                                    truncatedEndingComponent={"... "}
                                >{post.post_content}
                                </ShowMoreText>
                                {post.totalMediaFile === 1 ?
                                    <div>
                                        <img className="postImg" src={post.mediafile[0].media_file_name} alt="" />
                                    </div>
                                    : post.totalMediaFile === 2 ?
                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                            {post.mediafile.map((item) => (
                                                <ImageListItem key={item.media_file_name}>
                                                    <img
                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList> : post.totalMediaFile === 3 ?
                                            <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                {post.mediafile.map((item) => (
                                                    <ImageListItem key={item.media_file_name}>
                                                        <img
                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={item.title}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList> :
                                            <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                                {post.mediafile.map((item) => (
                                                    <ImageListItem key={item.media_file_name}>
                                                        <img
                                                            src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                            srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                            alt={item.title}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>}
                            </div>
                            <div className="postBottomStatistical">
                                <span className="postTextStatistical">20k lượt thích</span> <div><span className="postTextStatistical statisticalComment">20k bình luận</span><span className="postTextStatistical">20k lượt chia sẻ</span></div>
                            </div>
                            <div className="postBottom">
                                <div className="postBottomLeft">
                                    <div className="postBottomButton"><button className="btn ">Thích </button></div>
                                    <div className="postBottomButton"><button onClick={handleClickOpen} className="btn ">Bình luận</button></div>
                                    <div className="postBottomButton"><button className="btn ">Chia sẻ</button></div>
                                    {/* <span className="postLikeCounter">{like}</span> */}
                                </div>

                            </div>
                            <div>
                                {commentList.map((u) => (

                                    <Comment key={u.id} comment={u} />

                                ))}
                            </div>
                            <div>
                                <CommentBox />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>

    );
}

export default Post;