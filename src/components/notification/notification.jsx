import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './notification.css';


function Notification({ close }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-notifications';
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log("LOG VIDEOS", response.data);
            setNotifications(response.data);
        }).catch((error) => console.log(error))
    }, [cookies])
    return (

        <div className='notification'>
            {
                close ?
                    <div className='notification-list'>
                        {
                            notifications.map((notification) => (
                                <div key={notification.id} className='notificationItem' >
                                    <div className='notificationHeader'>
                                        <div className="notificationAvatar"></div>
                                        <div className="notificationContent">
                                            <span className="notificationMessage"><span className='notificationUserName'>{notification.userNameFrom}</span> {notification.title}</span>
                                        </div>
                                    </div>
                                    <div className='notificationBottom'><div className='notificationCreateAt'>1 ngày trước</div></div>
                                </div>
                            ))
                        }

                    </div> : <></>
            }
        </div>
    )
}

export default Notification;