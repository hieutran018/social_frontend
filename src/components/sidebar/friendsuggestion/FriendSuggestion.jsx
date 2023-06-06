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
import FriendSuggestionCard from "./friendSuggestionCard/friendSuggestionCard";

function SidebarFriendSuggestion() {
    const [frs, setFrs] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
    useEffect(() => {
        const fetchFriendSuggestion = () => {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-friends-suggestion';
            axios({
                method: 'GET', //you can set what request you want to be
                url: requestURL,
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
                    <FriendSuggestionCard u={u} key={u.id} />
                ))}
            </ul>
        </div >
    );
}
export default SidebarFriendSuggestion