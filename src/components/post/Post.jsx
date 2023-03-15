import { MoreVert } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShowMoreText from "react-show-more-text";
import { useState } from "react";
import './post.css';

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
                    <span className="postDate">{post.created_at}
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

                    <img className="postImg" src={post.photo} alt="" />
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