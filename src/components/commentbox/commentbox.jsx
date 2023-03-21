import { useState } from 'react';
import axios from 'axios';
import './commentbox.css';

function CommentBox({ postId }) {
    const [inputComment, setInputComment] = useState('');
    const handleClickPostComment = () => {
        console.log('Press to enter')
        const token = JSON.parse(sessionStorage.getItem('token'));
        axios({
            method: 'POST', //you can set what request you want to be
            url: 'http://127.0.0.1:8000/api/v1/create-comment-post',
            data: { postId: postId, commentContent: inputComment },
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setInputComment('');
    }
    return (
        <div className="commentBox">
            <img className="commentBoxAvatarProfile" src="assets/person/2.jpeg" alt="" />
            <input onKeyDownCapture={
                event => {
                    if (event.key === 'Enter') {
                        handleClickPostComment()
                    }
                }
            } className="commentBoxInut" type="text" value={inputComment} onChange={(event) => setInputComment(event.target.value)} />
        </div>

    );
}

export default CommentBox;