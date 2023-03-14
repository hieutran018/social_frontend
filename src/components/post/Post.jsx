import { MoreVert } from "@mui/icons-material";
import PublicIcon from '@mui/icons-material/Public';
import { useState } from "react";
import './post.css';

function Post({ post }) {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src="assets/person/1.jpeg"
                            alt=""
                        />
                        <span className="postUsername">
                            {post.user_id}
                        </span>

                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postPrivacy">
                    <span className="postDate">{post.created_at}  <PublicIcon className="postIconPrivacy" /></span>

                </div>
                <div className="postCenter">

                    <div className="postText">{post.post_content} </div><div className="viewMoreText">xem them</div>

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