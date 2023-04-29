import './comment.css';
import moment from 'moment';
import 'moment/locale/vi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentBox from '../commentbox/commentbox'


function Comment({ comment }) {
    const navigate = useNavigate();
    const [isReply, setIsReply] = useState(false);
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
        <div>
            <div className='comment'>
                <div className="commentCard">
                    <div className="commentAvatarContainer">
                        <a href={"/userId/" + comment.userId}><img className="commentAvatarProfile" src={comment.avatarUser} alt="" /></a>
                    </div>
                    <div className='commentMain'>
                        <div onClick={() => viewProfileUser(comment.userId)} className="commentUserNameContainer">
                            <span className="commentUserName"><a className='commentLinkProfileUser' href={"/userId/" + comment.userId}>{comment.displayName}</a></span>
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
            <div className='commentReply'>
                {
                    comment.replies.map((reply) => (
                        <div key={reply.id}>
                            <div className='comment'>
                                <div className="commentCard">
                                    <div className="commentAvatarContainer">
                                        <a href={"/userId/" + reply.userId}><img className="commentAvatarProfile" src={reply.avatarUser} alt="" /></a>
                                    </div>
                                    <div className='commentMain'>
                                        <div onClick={() => viewProfileUser(reply.userId)} className="commentUserNameContainer">
                                            <span className="commentUserName"><a className='commentLinkProfileUser' href={"/userId/" + reply.userId}>{reply.displayName}</a></span>
                                        </div>
                                        <div className="commentContent">
                                            <span>{reply.comment_content}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='commentBottom'>
                                <span className="commentSubItem">Thích</span>
                                <span onClick={handleOpenCommentBox} className="commentSubItem">Phản hồi</span>
                                <span className="commentSubItem">{moment(reply.created_at, 'YYYYMMDD H:mm:ss').fromNow()}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='commentReply'>
                {isReply ? <CommentBox postId={comment.post_id} commentId={comment.id} /> : <></>}
            </div>

        </div>

    );
}

export default Comment;