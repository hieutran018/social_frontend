import {
    useEffect, useState
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
    ArrowBack
} from '@mui/icons-material';
import './friendsuggestion.css';

function SidebarFriendSuggestion() {
    const [frs, setFrs] = useState([]);
    const cookies = useCookies('_tk');
    useEffect(() => {
        const fetchFriendSuggestion = () => {
            axios.get('http://127.0.0.1:8000/api/v1/fetch-friend-suggestion', {
                headers: {
                    'Authorization': 'Bearer ' + cookies[0]._tk
                }
            }).then((res) => setFrs(res.data)).catch((err) => console.log(err));

        }
        fetchFriendSuggestion()
    }, [cookies])
    return (
        <div className="sidebarFriendSuggestion">
            <div className="titleFriendSuggestion">
                <Link to="/friend"><ArrowBack className='iconBack' />
                </Link> Gợi ý
            </div>
            <ul className="sidebarList">
                {frs.map((u) => (
                    <Link key={u.id} className="frslinkProfile" to={"/friend-suggestion/" + u.id} >
                        <li className="sidebarListItemFriendSuggestion">
                            <div className="frsContainnerImage"><img className='imageProfile' src={u.avatar} alt="" /></div>
                            <div className='profileInfo'>
                                <div className="nameProfile">{u.username}</div>
                                <div className="buttonAction">
                                    <button className='buttonSuggesstionAccept'>Thêm bạn bè</button>
                                    <button className='buttonSuggesstionCancel'>Xóa, gỡ bỏ</button>
                                </div>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
export default SidebarFriendSuggestion