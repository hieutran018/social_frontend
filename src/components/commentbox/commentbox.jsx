import { useState } from 'react';
import axios from 'axios';
import './commentbox.css';
import { useCookies } from 'react-cookie';

function CommentBox({ postId, commentId, setComment }) {
    const [inputComment, setInputComment] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const cookies = useCookies('_tk')[0]._tk;
    const handleClickReplyComment = () => {
        console.log("CURENT COMMENT:" + commentId);
        console.log('Press to enter')
        const requestURL = 'http://127.0.0.1:8000/api/v1/reply-comment';

        axios({
            method: 'POST', //you can set what request you want to be
            url: requestURL,
            data: { postId: postId, commentContent: inputComment, commentId: commentId },
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then(response => {
            setComment.push(response.data);
        }).catch(error => console.log(error));
        setInputComment('');
    }
    console.log(commentId, postId)
    return (
        <div className="commentBox">
            <img className="commentBoxAvatarProfile" src={user.avatar} alt="" />
            <input onKeyDownCapture={
                event => {
                    if (event.key === 'Enter') {
                        handleClickReplyComment()
                    }
                }
            } className="commentBoxInut" type="text" value={inputComment} onChange={(event) => setInputComment(event.target.value)} />
        </div>

    );
}

export default CommentBox;