import './group.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import GroupPage from '../../components/group/group';
import MyGroup from '../../components/mygroup/mygroup';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';


function Group() {
    const cookies = useCookies('_tk')[0]._tk;
    const pages = useParams().pages;
    const groupId = useParams().groupId;
    const [group, setGroup] = useState([]);
    console.log(pages, groupId);



    useEffect(() => {
        if (groupId) {
            function fetchGroupByIdGroup() {
                const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-group-by-id/' + groupId;

                axios({
                    method: "GET",
                    url: requestURL,
                    headers: {
                        Authorization: "Bearer " + cookies,
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': '*',
                    }
                }).then((response) => {
                    console.log("CHECK ADMIN", response.data)
                    setGroup(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            }
            fetchGroupByIdGroup();
        }



    }, [groupId, cookies])

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
                        <GroupPage group={group} />
                    </div> : pages === 'my_group' ? <div className="myGroup">
                        <MyGroup />
                    </div> : <></>
                }
            </div>

        </div>
    );
}

export default Group;