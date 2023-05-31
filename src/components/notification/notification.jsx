import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './notification.css';
import Lottie from 'react-lottie-player';
import Nodata from '../../lottiefiles/nodata.json';


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

                        </div>
                }
            </div>
            :
            <></>


    )
}

export default Notification;