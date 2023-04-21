import './group.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import GroupPage from '../../components/group/group';
import MyGroup from '../../components/mygroup/mygroup';
import Variants from '../../components/feed/postskeleton';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostGroup } from '../../redux/actions/postAction';
import { selectPost, selectPostStatus } from '../../redux/selectors/postSelector';
import { useCookies } from 'react-cookie';


function Group() {
    const cookies = useCookies('_tk')[0]._tk;
    const pages = useParams().pages;
    const groupId = useParams().groupId;
    const dispatch = useDispatch();
    const status = useSelector(selectPostStatus)
    const posts = useSelector(selectPost);
    useEffect(() => {
        dispatch(fetchPostGroup(cookies))
    }, [cookies, dispatch])
    return (
        <div>
            <div className='groupTopBar'>
                <Topbar />
            </div>
            <div className='groupContainer'>
                <Sidebar page={5} />
                {
                    pages === 'feeds' ? <div className="groupFeed">
                        <div className='groupFeedTitle'>Hoạt động gần đây</div>
                        {
                            status === 'loading' ?
                                <div className="feed">
                                    <div className="feedWrapper">
                                        <Variants />
                                        <Variants />
                                    </div>
                                </div> : status === 'succeeded' ?
                                    <Feed post={posts} isGroup={true} /> : <>FAILED</>
                        }
                    </div> : pages === 'group' && groupId ? <div className="groupDetail">
                        <GroupPage groupId={groupId} />
                    </div> : pages === 'my_group' ? <div className="myGroup">
                        <MyGroup />
                    </div> : <></>
                }
            </div>

        </div>
    );
}

export default Group;