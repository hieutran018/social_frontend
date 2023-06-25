import { Link, useParams } from 'react-router-dom';
import './sidebarchat.css';
function ChatCard({ chat }) {
    const userId = useParams().userId;
    return (
        <Link to={"/chats/" + chat.userId} className={userId === parseInt(chat.userId) ? 'chatItem chatItemActive' : 'chatItem'}>
            <img className='chatItemAvatar' src={chat.conversation_avatar} alt="" />
            <div className='chatItemName'>
                <div>{chat.conversation_name}</div>

            </div>
        </Link>
    );
}

export default ChatCard;