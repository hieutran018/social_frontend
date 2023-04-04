import Post from "../post/Post";
import './feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../redux/actions/postAction'
import { selectPostStatus, selectPost } from '../../redux/selectors/postSelector'
import { useEffect } from "react";

function Feed() {
    const dispatch = useDispatch()
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost)
    // const [postList, setPostList] = useState([]);
    useEffect(() => {
        dispatch(fetchPost());
        console.log("==SET STATUS LIST==", status);
        console.log("==SET POST LIST==", posts);
    }, [dispatch])

    return (<div className="feed">
        <div className="feedWrapper">
            {
                status === 'loading' ?
                    <div></div>
                    : status === 'succeeded' ? posts.map((p) => (
                        <Post key={p.id} post={p} />
                    )) : status === 'failed' ? <div>Fail!</div> : ""
            }
        </div>
    </div>);
}

export default Feed;