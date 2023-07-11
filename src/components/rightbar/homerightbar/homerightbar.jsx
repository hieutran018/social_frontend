import '../rightbar.css';
import Online from "../../online/Online";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../../auth/auth';

function HomeRightbar() {
    const cookies = useCookies('_tk')[0]._tk;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-friend-by-user-id/' + userId + '/25';
        baseURL.get('/api/v1/fetch-friend-by-user-id/' + userId + '/25', {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setFriends(response.data);
        }).catch((error) => console.log(error.message));
    }, [cookies, userId])
    return (
        <div className="homeRightbar">
            {/* <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                    <b>Dương Nghĩa Hiệp</b> và <b>3 người bạn khác</b> sinh nhật hôm nay.
                </span>
            </div> */}
            {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
            <h4 className="rightbarTitle">Người liên hệ</h4>
            <ul className="rightbarFriendList">
                {friends.map((online) => (
                    <Online key={online.id} user={online} />
                ))}
            </ul>
        </div>
    );
}


export default HomeRightbar;