import './video.css';
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../data";

import { useState, useRef, useEffect } from "react";


function Video({ post }) {
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    // const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        let options = {
            rootMargin: "0px",
            threshold: [0.25, 0.75]
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    });


    return (
        <>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <img
                                className="postProfileImg"
                                src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                                alt=""
                            />
                            <span className="postUsername">
                                {Users.filter((u) => u.id === post?.userId)[0].username}
                            </span>
                            <span className="postDate">{post.date}</span>
                        </div>
                        <div className="postTopRight">
                            <MoreVert />
                        </div>
                    </div>
                    <div className="postCenter">
                        <span className="postText">{post?.desc}</span>
                        <video loop ref={videoRef} className="srcVideo" src="http://webcoban.vn/file/bunny.mp4" controls></video>
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
        </>
    );
}

export default Video;