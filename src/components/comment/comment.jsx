import './comment.css';


function Comment({ comment }) {

    return (
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
    );
}

export default Comment;