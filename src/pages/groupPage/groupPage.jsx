import './groupPage.css';
import MyGroup from '../../components/mygroup/mygroup';
import { useParams } from 'react-router-dom';
import NewsFeedGroup from '../../components/feed/group/newsfeedgroup';
import GroupPageDetail from '../../components/group/group';
import { useEffect } from 'react';

function GroupPage() {
    const pages = useParams().pages;
    const groupId = useParams().groupId;

    return (
        <div className='groupPage'>
            {
                pages === 'feeds' ? <NewsFeedGroup groupId={groupId} /> :
                    pages === 'group' && groupId ?
                        <div className="groupDetail">
                            <GroupPageDetail groupId={groupId} />
                        </div> :
                        pages === 'my_group' ? <div className="myGroup">
                            <MyGroup />
                        </div> : <></>
            }
        </div>
    );
}

export default GroupPage;