import './watch.css'
import Video from '../video/Video';
import { Posts } from "../../data";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Watch() {
    const cookies = useCookies('_tk')[0]._tk;
    const [videos, setVideos] = useState([]);

    function fetchVideos() {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-reels-video';
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log("LOG VIDEOS", response.data);
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