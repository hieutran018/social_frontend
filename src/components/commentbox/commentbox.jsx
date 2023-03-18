import './commentbox.css';

function CommentBox() {
    return (
        <div className="commentBox">
            <img className="commentBoxAvatarProfile" src="assets/person/2.jpeg" alt="" />
            <input className="commentBoxInut" type="text" />
        </div>
    );
}

export default CommentBox;