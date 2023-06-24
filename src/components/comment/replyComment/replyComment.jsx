import './replyComment.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ReplyCommentCard from './replyCommentCard';


function ReplyComment({ parent }) {
    const cookies = useCookies('_tk')[0]._tk
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const requestURL = 'https://ckcsocial.site/api/v1/fetch-reply-comment/commentId=' + parent;
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies
            }
        }).then((response) => {
            console.log(response.data, "COMMENT PARENT" + parent);
            setComments(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [parent, cookies]);
    return (
        <div style={{ marginLeft: "2rem" }}>
            {
                comments.map((comment) => (
                    <ReplyCommentCard comment={comment} commentList={comments} />
                ))
            }
        </div>
    );
}

export default ReplyComment;