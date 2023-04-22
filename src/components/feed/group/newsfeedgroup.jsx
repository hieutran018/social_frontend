import Variants from "../postskeleton";
import Feed from "../Feed";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostGroup } from '../../../redux/actions/postAction';
import { selectPost, selectPostStatus } from '../../../redux/selectors/postSelector';
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
function NewsFeedGroup({ groupId }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost);
    useEffect(() => {
        dispatch(fetchPostGroup(cookies))
    }, [cookies, dispatch])

    return (
        <div className="groupFeed">
            <div className='groupFeedTitle'>Hoạt động gần đây</div>
            {
                status === 'loading' ?
                    <div className="feed">
                        <div className="feedWrapper">
                            <Variants />
                            <Variants />
                        </div>
                    </div> : status === 'succeeded' ?
                        <Feed post={posts} isGroup={true} /> : <div className="feed">
                            <div className="feedWrapper">
                                <Variants />
                                <Variants />
                            </div>
                        </div>
            }
        </div >
    );
}

export default NewsFeedGroup;