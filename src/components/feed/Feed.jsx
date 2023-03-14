import Post from "../post/Post";
import './feed.css';
import { Posts } from "../../data";
import Share from "../share/Share";
import { useEffect, useState } from "react";

function Feed() {
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        async function fetchDataPost() {
            const requestURL = "http://127.0.0.1:8000/api/fetch-post";
            const response = await fetch(requestURL);
            const responseJson = await response.json();
            setPostList(responseJson);

        }
        fetchDataPost();
    }, [])
    // console.log("==SET POST LIST==", postList);
    return (<div className="feed">
        <div className="feedWrapper">
            <Share />
            {postList.map((p) => (
                <Post key={p.id} post={p} />
            ))}
        </div>
    </div>);
}

export default Feed;