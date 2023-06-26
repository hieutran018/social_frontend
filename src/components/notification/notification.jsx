import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './notification.css';
import Lottie from 'react-lottie-player';
import Nodata from '../../lottiefiles/nodata.json';
import { Link } from 'react-router-dom';
import { baseURL } from '../auth/auth';

function Notification({ close, channel }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [notifications, setNotifications] = useState([]);
    channel.bind('my-event', function (data) {
        setNotifications([data.notif, ...notifications]);
        console.log('ADD REALTIME NOTI', data, notifications);
    })
    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-notifications';
        baseURL.get('/api/v1/fetch-notifications', {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setNotifications(response.data);
        }).catch((error) => console.log(error))
    }, [cookies])

    return (
        close ?
            <div className='notification'>
                {
                    notifications.length === 0 ?

                        <div>
                            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                                <Lottie
                                    loop
                                    animationData={Nodata}
                                    play
                                    style={{ width: 400, height: 300 }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}><span style={{ color: "black", fontSize: "25px", fontWeight: "500" }}>Không có thông báo nào!</span></div>
                        </div>
                        :
                        <div className='notification-list' >
                            {
                                notifications.map((notification) => (
                                    <Link key={notification.id} style={{ textDecoration: "none" }} to={notification.object_type === "crPost" ? "/posts/view-post-detail/" + notification.object_id : "/"}>
                                        <div className='notificationItem' >
                                            <div className='notificationHeader'>
                                                <img className="notificationAvatar" src={notification.userAvatarFrom} alt="" />
                                                <div className="notificationContent">
                                                    <span className="notificationMessage"><span className='notificationUserName'>{notification.userNameFrom}</span> {notification.title}</span>
                                                </div>
                                            </div>
                                            <div className='notificationBottom'><div className='notificationCreateAt'>1 ngày trước</div></div>
                                        </div>
                                    </Link>
                                ))
                            }

                        </div>
                }
            </div>
            :
            <></>


    )
}

export default Notification;