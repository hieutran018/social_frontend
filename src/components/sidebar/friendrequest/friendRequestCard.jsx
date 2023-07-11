import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../friendsuggestion/friendsuggestion.css';
import '../sidebar.css';
import { baseURL } from "../../auth/auth";
function FriendRequestCard({ friend }) {
    const [button, setButton] = useState(false);
    const cookies = useCookies('_tk')[0]._tk;
    const hanldeClickAcceptAddFriend = (userId) => {
        // const requestURL = "https://ckcsocial.site/api/v1/accept-friend-request";
        baseURL.post('/api/v1/accept-friend-request', {
            userIdRequest: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setButton(true);
        }).catch((error) => console.log(error));
    }

    const hanldeClickCancelAddFriend = (userId) => {
        baseURL.post('/api/v1/deny-friend-request', {
            userId: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => console.log(error.message));
    }

    return (
        <li key={friend.id} className="sidebarListItemFriendSuggestion">
            <Link className="frslinkProfile" to={"/friend-request/" + friend.id} >
                <div className="frsContainnerImage"><img className='imageProfile' src={friend.avatar} alt="" /></div>
            </Link>
            <div className='profileInfo'>
                <Link className="frslinkProfile" to={"/friend-suggestion/" + friend.id} >
                    <div className="nameProfile">{friend.displayName}</div>
                </Link>
                <div className="buttonAction">
                    {
                        !button ? <button onClick={() => hanldeClickAcceptAddFriend(friend.user_request)} className='buttonSuggesstionAccept'>Đồng ý</button> :
                            <button onClick={() => hanldeClickCancelAddFriend(friend.user_request)} className='buttonSuggesstionAccept'>Hoàn tác</button>
                    }
                    <button onClick={() => hanldeClickCancelAddFriend(friend.user_request)} className='buttonSuggesstionCancel'>Xóa, gỡ bỏ</button>
                </div>
            </div>
        </li>
    );
}

export default FriendRequestCard;