import './video.css';
// import { MoreVert } from "@mui/icons-material";
import { Users } from "../../data";
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai'

import { useRef, useEffect } from "react";


function Video({ post }) {

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
            <div className="video">
                <div className="videoWrapper">
                    <div className="videoPostTop">
                        <div className="videoPostTopLeft">
                            <img
                                className="videoProfileImg"
                                src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                                alt=""
                            />
                            <div className='videoPostUser'>
                                <span className="videoUsername">
                                    {Users.filter((u) => u.id === post?.userId)[0].username}
                                </span>
                                <div className="videoDate">{post.date}</div>
                            </div>
                        </div>
                        {/* <div className="postTopRight">
                            <MoreVert />
                        </div> */}
                    </div>
                    <div className="videoCenter">

                        <div className="videoText">{post?.desc}</div>

                        <div className='videoSrcVideo'>
                            <video ref={videoRef} className="srcVideo" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" controls></video>
                        </div>
                    </div>
                    <div className="videoBottomStatistical">
                        <span className="videoTextStatistical">1k lượt thích</span>
                        <div>
                            <span className="videoTextStatistical statisticalComment">1k bình luận</span>
                            <span className="videoTextStatistical">1k lượt chia sẻ</span>
                        </div>
                    </div>
                    <div className="videoBottom">
                        <div className="videoBottomLeft">
                            <div className="videoBottomButton"><button className="videoBtn "><AiOutlineLike size={25} /> </button></div>
                            <div className="videoBottomButton"><button className="videoBtn "><AiOutlineComment size={25} /></button></div>
                            <div className="videoBottomButton"><button className="videoBtn "><AiOutlineShareAlt size={25} /></button></div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Video;