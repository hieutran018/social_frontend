import React from "react";
import { MoreVert } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';

import 'moment/locale/vi';
import { useState } from "react";
import './post.css';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function Post({ post }) {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    return (
        <div className="post">
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
                    <div className="postTopRight">
                        <MoreVert />
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

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} bình luận</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;