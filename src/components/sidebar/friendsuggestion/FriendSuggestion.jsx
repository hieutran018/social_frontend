import {
    useEffect, useState
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    ArrowBack
} from '@mui/icons-material';
import './friendsuggestion.css';

function SidebarFriendSuggestion() {
    const [frs, setFrs] = useState([]);
    useEffect(() => {
        const fetchFriendSuggestion = () => {
            axios.get('http://127.0.0.1:8000/api/fetch-friend-suggestion').then((res) => setFrs(res.data)).catch((err) => console.log(err));

        }
        fetchFriendSuggestion()
    }, [])
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