import Post from "../post/Post";
import './feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../redux/actions/postAction'
import { selectPostStatus, selectPost } from '../../redux/selectors/postSelector'
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Lottie from 'react-lottie-player'
import Variants from './postskeleton';
import ErrorAnimation from '../../lottiefiles/error.json';

function Feed({ post, isGroup }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch()
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost)
    // const [postList, setPostList] = useState([]);
    useEffect(() => {
        dispatch(fetchPost(cookies));
    }, [dispatch, cookies])
    console.log(post)

    return (<div className="feed">
        <div className="feedWrapper">
            {
                post ? post.map((p) => (
                    <Post key={p.id} post={p} groups={true} />
                )) :
                    status === 'loading' ?
                        <div><Variants /></div>
                        : status === 'succeeded' ? posts.map((p) => (
                            <Post key={p.id} post={p} groups={isGroup} />
                        )) : status === 'failed' ?
                            <div>
                                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                                    <Lottie
                                        loop
                                        animationData={ErrorAnimation}
                                        play
                                        style={{ width: 400, height: 300 }}
                                    />
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}><span style={{ color: "black", fontSize: "25px", fontWeight: "600" }}>Có lỗi xảy ra, vui lòng thử lại!</span></div>
                            </div> : ""
            }
        </div>
    </div>);
}

export default Feed;