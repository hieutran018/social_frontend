import Post from "../post/Post";
import './feed.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../redux/actions/postAction'
import { selectPostStatus, selectPost } from '../../redux/selectors/postSelector'
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Lottie from 'react-lottie-player'
import Variants from './postskeleton';
import LoadingFailAnimationJSON from '../../lottiefiles/loading_fail.json'

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
                    <div><Variants /></div>
                    : status === 'succeeded' ? posts.map((p) => (
                        <Post key={p.id} post={p} />
                    )) : status === 'failed' ?
                        <div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Lottie
                                    loop
                                    animationData={LoadingFailAnimationJSON}
                                    play
                                    style={{ width: 500, height: 500 }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}><span style={{ color: "red", fontSize: "20px", fontWeight: "500" }}>Có lỗi xảy ra, vui lòng thử lại!</span></div>
                        </div> : ""
            }
        </div>
    </div>);
}

export default Feed;