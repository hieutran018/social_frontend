import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ArrowBack } from '@mui/icons-material';
import '../friendsuggestion/friendsuggestion.css';
import '../sidebar.css';
import { baseURL } from "../../auth/auth";
import FriendRequestCard from "./friendRequestCard";

function FriendRequest() {
    const [frs, setFrs] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchFriendRequest = () => {
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-friend-request-list';
            baseURL.get('/api/v1/fetch-friend-request-list/userId=' + user.id, {
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
    }, [cookies, user.id])

    return (
        <div className="sidebarFriendSuggestion">
            <div className="titleFriendSuggestion">
                <Link to="/friend"><ArrowBack className='iconBack' />
                </Link> Lời mời kết bạn
            </div>
            <ul className="sidebarList">
                {frs.map((u) => (
                    <FriendRequestCard friend={u} />
                ))}
            </ul>
        </div >
    )
}

export default FriendRequest;