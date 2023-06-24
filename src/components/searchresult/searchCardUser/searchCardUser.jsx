import { useState } from 'react';
import './searchCardUser.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
function SearchCardUser({ data }) {
    console.log(data, "USER SEARCH");
    const cookies = useCookies('_tk')[0]._tk;
    const [isAdd, setIsAdd] = useState(false);
    const hanldeClickSendAddFriend = (userId) => {
        const requestURL = "https://ckcsocial.site/api/v1/request-add-friend";
        console.log(userId);
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
            console.log(response.data);
            setIsAdd(true);
        }).catch((error) => console.log(error));
    }

    const hanldeClickCancelAddFriend = (userId) => {
        const requestURL = "https://ckcsocial.site/api/v1/cancle-add-friend";
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

        <div className='searchResultUserCard'>
            <Link className='searchResultLink' to={"/userId/" + data.id}>
                <div className='searchResultCardLeft'>
                    <img className='searchResultAvatar' src={data.avatar} alt="" />
                </div>
            </Link>
            <div className='searchResultCardRight'>
                <Link className='searchResultLink' to={"/userId/" + data.id}>
                    <div className='searchResultName'>{data.displayName}</div>
                </Link>
                {
                    data.isFriend ?
                        <Link to={"/userId/" + data.id} className='searchResultButtonAction searchResultLink'>Xem</Link> :
                        (isAdd ? <div onClick={() => hanldeClickCancelAddFriend(data.id)} className='searchResultButtonAction'>Hoàn tác</div> : <div onClick={() => hanldeClickSendAddFriend(data.id)} className='searchResultButtonAction'>Kết bạn</div>)
                }
            </div>
        </div>

    );
}

export default SearchCardUser;