import React from "react";
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShowMoreText from "react-show-more-text";
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import { useCookies } from "react-cookie";
import axios from "axios";
import 'moment/locale/vi';

import PostDetail from "../postdetail/postdetail";
import './post.css';

function Post({ post }) {
    const cookies = useCookies('_tk');
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    const handleClickSharePost = (postId) => {
        axios({
            method: 'POST', //you can set what request you want to be
            url: 'http://127.0.0.1:8000/api/v1/share-post-to-profile',
            data: { postId: postId, postContent: null },
            headers: {
                Authorization: 'Bearer ' + cookies[0]._tk
            }
        })
    }

    // console.log(post);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <a href={"/" + post.user_id}>
                            <img
                                className="postProfileImg"
                                src={post.avatarUser}
                                alt={"Avatar user " + post.username}
                            />
                        </a>

                        <div>
                            <span className="postUsername">
                                <a className="postLinkProfileUser" href={"/" + post.user_id}>
                                    {post.username}
                                </a>
                            </span>
                            <div className="postPrivacy">
                                <span className="postDate">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                    {post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : post.privacy === 2 ? <GroupIcon className="postIconPrivacy" /> : <PersonRemoveIcon className="postIconPrivacy" />}</span>
                            </div>
                        </div>

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
                                {post.totalMediaFile === 1 ?
                                    <div>
                                        {
                                            post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.mediafile[0].media_file_name} controls></video> :
                                                <img className="postImg" src={post.mediafile[0].media_file_name} alt="" />
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
                                            </ImageList> :
                                            <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
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
                                            </ImageList>}
                            </div> :
                            <div className="postParent">
                                <div className="postShareWrapper">
                                    <div className="postShareCenter">
                                        <div>
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
                                                        </ImageList>}
                                        </div>

                                    </div>
                                    <div className="postShareTop">
                                        <div className="postTopLeft">
                                            <a href={"/" + post.parent_post.user_id}>
                                                <img
                                                    className="postProfileImg"
                                                    src={post.parent_post.avatarUser}
                                                    alt={"Avatar user " + post.parent_post.username}
                                                />
                                            </a>

                                            <div>
                                                <span className="postUsername">
                                                    <a className="postLinkProfileUser" href={"/" + post.parent_post.user_id}>
                                                        {post.parent_post.username}
                                                    </a>
                                                </span>
                                                <div className="postPrivacy">
                                                    <span className="postshareDate">{moment(post.parent_post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                        {post.parent_post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.parent_post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : post.privacy === 2 ? <GroupIcon className="postIconPrivacy" /> : <PersonRemoveIcon className="postIconPrivacy" />}</span>
                                                </div>
                                            </div>
                                        </div>

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
                    <span className="postTextStatistical">20k lượt thích</span>
                    <div>
                        <span className="postTextStatistical statisticalComment">{post.totalComment === 0 ? "" : post.totalComment + " bình luận"}</span>
                        <span className="postTextStatistical">20k lượt chia sẻ</span>
                    </div>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div className="postBottomButton"><button className="btn ">Thích </button></div>
                        <div className="postBottomButton"><button onClick={() => handleClickOpen()} className="btn ">Bình luận</button></div>
                        <div className="postBottomButton"><button onClick={() => handleClickSharePost(post.id)} className="btn ">Chia sẻ</button></div>
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
                    <PostDetail post={post} />
                </Dialog>
            </div>
        </div>
    );
}

export default Post;