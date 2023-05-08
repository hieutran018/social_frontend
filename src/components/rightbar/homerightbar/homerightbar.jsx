import '../rightbar.css';
import Online from "../../online/Online";
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

function HomeRightbar() {
    // const cookies = useCookies('_tk')[0]._tk;
    // const user = JSON.parse(localStorage.getItem('user'));
    const [onlines, setOnlines] = useState([]);
    const [friends, setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const socket = io('http://localhost:3001');
        socket.emit('online', { displayName: user.displayName, avatar: user.avatar, userId: user.id })
        socket.on('online', (response) => {
            setOnlines(response);
            console.log(response);
        });
    }, [])
    return (
        <div className="homeRightbar">
            <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                    <b>Dương Nghĩa Hiệp</b> và <b>3 người bạn khác</b> sinh nhật hôm nay.
                </span>
            </div>
            {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
            <h4 className="rightbarTitle">Người liên hệ</h4>
            <ul className="rightbarFriendList">
                {onlines.map((online) => (
                    <Online key={online.id} user={online} />
                ))}
            </ul>
        </div>
    );
}


export default HomeRightbar;