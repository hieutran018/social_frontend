import Post from "../post/Post";
import './feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../redux/actions/postAction'
import { selectPostStatus, selectPost } from '../../redux/selectors/postSelector'
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function Feed() {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch()
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost)
    // const [postList, setPostList] = useState([]);
    useEffect(() => {
        dispatch(fetchPost(cookies));
    }, [dispatch, cookies])

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