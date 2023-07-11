import { useCookies } from 'react-cookie';
import { baseURL } from '../../auth/auth';
import './notificationCard.css';
import { Link } from 'react-router-dom';

function NotificationCard({ notification }) {
    return (
        <div className="notificationCard">
            {
                notification.object_type === "FrInvitation" ? <NotificationAddFriend props={notification} /> :
                    notification.object_type === "crPost" || notification.object_type === 'FrAccept' ||
                        notification.object_type === 'reaction' || notification.object_type === 'comment' ||
                        notification.object_type === 'crStory' ? <NotificationPost props={notification} /> :
                        <></>
            }
        </div>
    )
}

function NotificationAddFriend({ props }) {
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
        <div className="notificationAddFriend">
            <div className='notificationAddFriendHeader'>
                <img className="notificationAddFriendAvatar" src={props.userAvatarFrom} alt="" />
                <div className="notificationAddFriendContent">
                    <span className="notificationAddFriendMessage"><span className='notificationAddFriendUserName'>{props.userNameFrom}</span> {props.title}</span>
                </div>
            </div>
            <div className='notificationAddFriendBottom'><div className='notificationAddFriendCreatedAt'>1 ngày trước</div></div>
            <div className='notificationAddFriendAction'>
                <button onClick={() => hanldeClickAcceptAddFriend(props.from)} className='notificationAddFriendAccept'>Đồng ý</button>
                <button onClick={() => hanldeClickCancelAddFriend(props.from)} className='notificationAddFriendCancel'>Hủy</button>
            </div>
        </div>
    );
}
function NotificationPost({ props }) {
    return (
        props.object_type === 'crPost' || props.object_type === 'reaction' ||
            props.object_type === 'comment' ?
            <Link style={{ textDecoration: 'none', color: 'black' }} to={"/posts/view-post-detail/" + props.object_id}>
                <div className="notificationPost">
                    <div className='notificationPostHeader'>
                        <img className="notificationPostAvatar" src={props.userAvatarFrom} alt="" />
                        <div className="nnotificationPostContent">
                            <span className="notificationPostMessage"><span className='notificationPostUserName'>{props.userNameFrom}</span> {props.title}</span>
                        </div>
                    </div>
                    <div className='notificationPostBottom'><div className='notificationPostCreatedAt'>1 ngày trước</div></div>
                </div>
            </Link> : props.object_type === 'crStory' ?
                <Link style={{ textDecoration: 'none', color: 'black' }} to={"/stories/view/" + props.from}>
                    <div className="notificationPost">
                        <div className='notificationPostHeader'>
                            <img className="notificationPostAvatar" src={props.userAvatarFrom} alt="" />
                            <div className="nnotificationPostContent">
                                <span className="notificationPostMessage"><span className='notificationPostUserName'>{props.userNameFrom}</span> {props.title}</span>
                            </div>
                        </div>
                        <div className='notificationPostBottom'><div className='notificationPostCreatedAt'>1 ngày trước</div></div>
                    </div>
                </Link> :
                <div className="notificationPost">
                    <div className='notificationPostHeader'>
                        <img className="notificationPostAvatar" src={props.userAvatarFrom} alt="" />
                        <div className="nnotificationPostContent">
                            <span className="notificationPostMessage"><span className='notificationPostUserName'>{props.userNameFrom}</span> {props.title}</span>
                        </div>
                    </div>
                    <div className='notificationPostBottom'><div className='notificationPostCreatedAt'>1 ngày trước</div></div>
                </div>

    )
}

export default NotificationCard;