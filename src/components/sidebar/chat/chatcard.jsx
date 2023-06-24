import { Link, useParams } from 'react-router-dom';
import avatar from '../../../ckc_social_logo.png';
import './sidebarchat.css';
function ChatCard({ chat }) {
    const userId = useParams().userId;
    return (
        <Link to={"/"} className='chatItem'>
            <img className='chatItemAvatar' src={avatar} alt="" />
            <div className='chatItemName'>
                <div>Tran Duong Chi Hieu</div>

            </div>
        </Link>
    );
}

export default ChatCard;