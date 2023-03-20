import './comment.css';
import moment from 'moment';
import 'moment/locale/vi';


function Comment({ comment }) {

    return (
        <div>
            <div className='comment'>
                <div className="commentCard">
                    <div className="commentAvatarContainer">
                        <img className="commentAvatarProfile" src="assets/person/2.jpeg" alt="" />
                    </div>
                    <div className='commentMain'>
                        <div className="commentUserNameContainer">
                            <span className="commentUserName">{comment.username}</span>
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