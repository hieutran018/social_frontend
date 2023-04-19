import './group.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import GroupPage from '../../components/group/group';
import MyGroup from '../../components/mygroup/mygroup';
import { useParams } from 'react-router-dom';


function Group() {

    const pages = useParams().pages;
    const groupId = useParams().groupId;
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
                        <Feed />
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