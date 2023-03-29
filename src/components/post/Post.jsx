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

import 'moment/locale/vi';

import PostDetail from "../postdetail/postdetail";
import './post.css';

function Post({ post }) {

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

                        <span className="postUsername">
                            <a className="postLinkProfileUser" href={"/" + post.user_id}>
                                {post.username}
                            </a>
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
                        <div className="postBottomButton"><button className="btn ">Chia sẻ</button></div>
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