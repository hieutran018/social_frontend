import { Link } from 'react-router-dom';
import './friendSuggestionCard.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useState } from 'react';

function FriendSuggestionCard({ u }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [isAdd, setIsAdd] = useState(false);
    const hanldeClickSendAddFriend = (userId) => {
        const requestURL = "http://127.0.0.1:8000/api/v1/request-add-friend";

        axios({
            method: 'POST',
            url: requestURL,
            data: { userIdAccept: userId },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            setIsAdd(true)
            console.log(response.data);
        }).catch((error) => console.log(error));
    }
    const hanldeClickCancelAddFriend = (userId) => {
        const requestURL = "http://127.0.0.1:8000/api/v1/cancle-add-friend";
        axios({
            method: 'POST',
            url: requestURL,
            data: { userId: userId },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setIsAdd(false);
        }).catch((error) => console.log(error.message));
    }
    return (
        <li key={u.id} className="sidebarListItemFriendSuggestion">
            <Link className="frslinkProfile" to={"/friend-suggestion/" + u.id} >
                <div className="frsContainnerImage"><img className='imageProfile' src={u.avatar} alt="" /></div>
            </Link>
            <div className='profileInfo'>
                <Link className="frslinkProfile" to={"/friend-suggestion/" + u.id} >
                    <div className="nameProfile">{u.displayName}</div>
                </Link>
                <div className="buttonAction">
                    {
                        isAdd ? <button onClick={() => hanldeClickCancelAddFriend(u.id)} className='buttonSuggesstionAccept'>Hoàn tác</button> :
                            <button onClick={() => hanldeClickSendAddFriend(u.id)} className='buttonSuggesstionAccept'>Thêm bạn bè</button>
                    }
                    <button className='buttonSuggesstionCancel'>Xóa, gỡ bỏ</button>
                </div>
            </div>
        </li>
    );
}

export default FriendSuggestionCard;