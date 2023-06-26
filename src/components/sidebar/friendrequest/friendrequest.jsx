import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ArrowBack } from '@mui/icons-material';
import '../friendsuggestion/friendsuggestion.css';
import '../sidebar.css';
import { baseURL } from "../../auth/auth";

function FriendRequest() {
    const [frs, setFrs] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;

    useEffect(() => {
        const fetchFriendRequest = () => {
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-friend-request-list';
            baseURL.post('/api/v1/fetch-friend-request-list', {}, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("RES =========", response.data);
                setFrs(response.data);
            }).catch((error) => console.log(error));

        }
        fetchFriendRequest()
    }, [cookies])

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

    return (
        <div className="sidebarFriendSuggestion">
            <div className="titleFriendSuggestion">
                <Link to="/friend"><ArrowBack className='iconBack' />
                </Link> Lời mời kết bạn
            </div>
            <ul className="sidebarList">
                {frs.map((u) => (
                    <li key={u.id} className="sidebarListItemFriendSuggestion">
                        <Link className="frslinkProfile" to={"/friend-request/" + u.id} >
                            <div className="frsContainnerImage"><img className='imageProfile' src={u.avatar} alt="" /></div>
                        </Link>
                        <div className='profileInfo'>
                            <Link className="frslinkProfile" to={"/friend-suggestion/" + u.id} >
                                <div className="nameProfile">{u.displayName}</div>
                            </Link>
                            <div className="buttonAction">
                                <button onClick={() => hanldeClickAcceptAddFriend(u.user_request)} className='buttonSuggesstionAccept'>Đồng ý</button>
                                <button className='buttonSuggesstionCancel'>Xóa, gỡ bỏ</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default FriendRequest;