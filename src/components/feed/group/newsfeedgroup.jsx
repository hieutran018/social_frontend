import Variants from "../postskeleton";
import Feed from "../Feed";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostGroup } from '../../../redux/actions/postAction';
import { selectPost, selectPostStatus, selectPage } from '../../../redux/selectors/postSelector';
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
function NewsFeedGroup({ groupId }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost);
    const page = useSelector(selectPage);
    const [nextPage, setNextPage] = useState(0)

    useEffect(() => {
        const handleScroll = async () => {
            if (
                window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight

            )
                return;
            setNextPage(nextPage === page ? page : nextPage + 1);
        };

        window.addEventListener("scroll", handleScroll);
        dispatch(fetchPostGroup(cookies, nextPage));
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [cookies, dispatch, nextPage])
    console.log(posts, nextPage);
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