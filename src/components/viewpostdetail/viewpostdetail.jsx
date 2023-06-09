import { useParams } from 'react-router-dom';
import Post from '../post/Post';
import './viewpostdetail.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function ViewPostDetail() {
    const postId = useParams().postId;
    const cookies = useCookies('_tk')[0]._tk;
    const [post, setPost] = useState();
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-post-by-id/postId=' + postId;
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((response) => {
            console.log(response.data);
            setPost(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [cookies, postId])
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className='viewPotDetail'>
                {
                    post ?
                        <Post post={post} /> :
                        <></>
                }
            </div>
        </div>
    );
}

export default ViewPostDetail;