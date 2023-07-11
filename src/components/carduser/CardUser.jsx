import { useCookies } from 'react-cookie';
import './carduser.css'
import { useState } from 'react';
import { baseURL } from '../auth/auth';

function CardUser({ user }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [button, setButton] = useState(false);
    console.log(user);
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
            setButton(false);
        }).catch((error) => console.log(error.message));
    }

    return (
        <div className='cardUser'>
            <img className="cardUserProfileImg" src={user.avatar} alt="" />
            <h1 className='textName'>{user.displayName}</h1>

            <div className='accept'>
                {
                    !button ? <button onClick={() => hanldeClickAcceptAddFriend(user.user_request)} className='buttonAccept'>Xác nhận</button> :
                        <button onClick={() => hanldeClickCancelAddFriend(user.user_request)} className='buttonAccept'>Hoàn tát</button>
                }
            </div>
            <div className='cancel'>
                <button onClick={() => hanldeClickCancelAddFriend(user.user_request)} className='buttonCancel'>Xóa</button>
            </div>

        </div>
    );
}

export default CardUser;