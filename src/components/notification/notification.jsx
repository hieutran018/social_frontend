import './notification.css';

function Notification({ close }) {

    return (
        <div className='notification'>
            {
                close ?
                    <div className='notification-list'>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
                                <div key={item} className='notificationItem' >
                                    <div className='notificationHeader'>
                                        <div className="notificationAvatar"></div>
                                        <div className="notificationContent">
                                            <span class="notificationMessage"><span className='notificationUserName'>John Doe</span> đã thích một bài viết của bạn.</span>
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