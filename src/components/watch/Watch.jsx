import './watch.css'
import Video from '../video/Video';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../auth/auth';

function Watch() {
    const cookies = useCookies('_tk')[0]._tk;
    const [videos, setVideos] = useState([]);

    function fetchVideos() {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-reels-video';
        baseURL.get('/api/v1/fetch-reels-video', {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setVideos(response.data);
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchVideos();
    }, [])

    return (
        <div className="watch">
            <div className="watchWrapper">
                {videos.map((video) => (
                    <Video key={video.id} video={video} />
                ))}
            </div>
        </div>);
}

export default Watch;