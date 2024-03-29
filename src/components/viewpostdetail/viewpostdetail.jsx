import { useParams } from 'react-router-dom';
import Post from '../post/Post';
import './viewpostdetail.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../auth/auth';

function ViewPostDetail() {
    const postId = useParams().postId;
    const cookies = useCookies('_tk')[0]._tk;
    const [post, setPost] = useState();
    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-post-by-id/postId=' + postId;
        baseURL.get('/api/v1/fetch-post-by-id/postId=' + postId, {
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
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: '3.5rem' }}>
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