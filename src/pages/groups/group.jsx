import './group.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import GroupPage from '../../components/group/group';
import MyGroup from '../../components/mygroup/mygroup';
import { useParams } from 'react-router-dom';
import NewsFeedGroup from '../../components/feed/group/newsfeedgroup';


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
                    pages === 'feeds' ? <NewsFeedGroup groupId={groupId} /> : pages === 'group' && groupId ? <div className="groupDetail">
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