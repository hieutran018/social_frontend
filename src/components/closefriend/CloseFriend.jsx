import './closefriend.css';

function CloseFriend({ user }) {
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.avatar} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}

export default CloseFriend;