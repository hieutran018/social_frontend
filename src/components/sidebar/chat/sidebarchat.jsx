import './sidebarchat.css';
import { Link } from 'react-router-dom';
import avatar from '../../../ckc_social_logo.png';
import ChatCard from './chatcard';

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <div className="titleFriendSuggestion">
                <Link to="/friend">
                </Link> Tro Chuyen
            </div>
            <div>
                {
                    [0, 1, 2, 3, 4, 5, 6].map((item) => (
                        <ChatCard key={item} chat={item} />
                    ))
                }
            </div>
        </div>
    )
}
export default SidebarChat;