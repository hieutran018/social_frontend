import './comment.css';
import moment from 'moment';
import 'moment/locale/vi';
import { useNavigate } from 'react-router-dom';


function Comment({ comment }) {
    const navigate = useNavigate();
    const viewProfileUser = (userId) => {
        const url = "/" + userId;
        navigate(url);
    }

    return (
        <div>
            <div className='comment'>
                <div className="commentCard">
                    <div className="commentAvatarContainer">
                        <a href={"/" + comment.userId}><img className="commentAvatarProfile" src={comment.avatarUser} alt="" /></a>
                    </div>
                    <div className='commentMain'>
                        <div onClick={() => viewProfileUser(comment.userId)} className="commentUserNameContainer">
                            <span className="commentUserName"><a className='commentLinkProfileUser' href={"/" + comment.userId}>{comment.username}</a></span>
                        </div>
                        <div className="commentContent">
                            <span>{comment.comment_content}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='commentBottom'><span className="commentSubItem">Thích</span><span className="commentSubItem">Phản hồi</span><span className="commentSubItem">{moment(comment.created_at, 'YYYYMMDD h:mm:ss').fromNow()}</span></div>
        </div>

    );
}

export default Comment;