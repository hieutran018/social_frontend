import { useState } from "react";

import CommentBox from "../../commentbox/commentbox";
import ReplyComment from "./replyComment";
import moment from 'moment';
import 'moment/locale/vi';
import { useNavigate } from "react-router-dom";
import authorUser from '../../../lottiefiles/tick_blue.png';

function ReplyCommentCard({ comment, commentList }) {
    console.log("COMMENT:" + comment.id);
    const navigate = useNavigate();
    const [isReply, setIsReply] = useState(false);
    const [viewMore, setViewMore] = useState();
    const [replies, setReplies] = useState(commentList);
    const viewProfileUser = (userId) => {
        const url = "/" + userId;
        navigate(url);
    }

    const handleOpenCommentBox = () => {
        setIsReply(true);
    }
    const handleCloseCommentBox = () => {
        setIsReply(false);
    }
    return (
        <div key={comment.id}>
            <div className='comment'>
                <div className="commentCard">
                    <div className="commentAvatarContainer">
                        <a href={"/userId/" + comment.userId}><img className="commentAvatarProfile" src={comment.avatarUser} alt="" /></a>
                    </div>
                    <div className='commentMain'>
                        <div onClick={() => viewProfileUser(comment.userId)} className="commentUserNameContainer">
                            <span className="commentUserName"><a className='commentLinkProfileUser' href={"/userId/" + comment.userId}>{comment.displayName}</a>
                                {comment.isVerified === 1 ? <img style={{ width: "24px", height: "24px" }} src={authorUser} alt="" /> : <></>}
                            </span>
                        </div>
                        <div className="commentContent">
                            <span>{comment.comment_content}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='commentBottom'>
                <span className="commentSubItem">Thích</span>
                <span onClick={!isReply ? handleOpenCommentBox : handleCloseCommentBox} className="commentSubItem">Phản hồi</span>
                <span className="commentSubItem">{moment(comment.created_at, 'YYYYMMDD H:mm:ss').fromNow()}</span>
            </div>
            {
                comment.fileName ?
                    <div className='commentBoxPreviewUploadContainer'>
                        {
                            comment.mediaType === 'jpeg' || comment.mediaType === 'png' || comment.mediaType === 'jpg' ? <img src={comment.fileName} width={500} height={200} alt="" /> :
                                <video controls width={500} height={200} src={comment.fileName}></video>
                        }

                    </div> :
                    <></>
            }
            {
                comment.countComment > 0 ?
                    viewMore ? <ReplyComment parent={comment.id} /> : <div onClick={() => setViewMore(true)} className='commetLoadMoreComment'>Xem thêm {comment.countComment} câu trả lời</div> :
                    <div></div>
            }
            <div className='commentReply'>
                {isReply ? <CommentBox postId={comment.post_id} commentId={comment.id} setComment={replies} /> : <></>}
            </div>

        </div>
    );
}

export default ReplyCommentCard;