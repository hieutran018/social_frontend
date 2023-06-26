import '../group.css';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { baseURL } from '../../auth/auth';

function FriendCard({ friend }) {
    const [isInvite, setInsInvite] = useState(false);
    const cookies = useCookies('_tk')[0]._tk;
    const groupId = useParams().groupId;

    function sendInviteJoinGroup(userId) {
        // const requestUrl = 'http://127.0.0.1:8000/api/v1/send-invite-to-group';
        baseURL.post('/api/v1/send-invite-to-group', {
            userId: userId, groupId: groupId
        }, {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setInsInvite(true)

        }).catch((error) => console.log(error.message));
    }
    function cancelInviteJoinGroup(userId) {
        // const requestUrl = 'http://127.0.0.1:8000/api/v1/cancel-invite-to-group';
        baseURL.post('/api/v1/cancel-invite-to-group', {
            userId: userId, groupId: groupId
        }, {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setInsInvite(false)
        }).catch((error) => console.log(error.message));
    }

    return (
        <ListItem>
            <img className='dialogGroupInviteFriendAvatar' src={friend.avatar} alt="" />
            <ListItemText className='dialogGroupInviteFriendName' primary={friend.displayName} secondary="" />
            {
                isInvite ?
                    <div onClick={() => cancelInviteJoinGroup(friend.friendId)} className='dialogcanelInvieGroupButton '>
                        <div className='dialogSendInviteGroup'>Hoàn tác</div>
                    </div> :
                    <div onClick={() => sendInviteJoinGroup(friend.friendId)} className='dialogSendInviteGroupButton'>
                        <div className='dialogSendInviteGroup'>Mời bạn bè</div>
                    </div>
            }
        </ListItem>
    );
}

export default FriendCard;