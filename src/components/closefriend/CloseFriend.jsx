import './closefriend.css';

function CloseFriend({ group }) {
    return (
        <div className="sidebarGroupCard">
            <div className='sidebarGroupContainer'>
                <img className="sidebarFriendImg" src={group.avatar} alt="" />
                <span className="sidebarFriendName">{group.group_name}</span>
            </div>
        </div>
    );
}

export default CloseFriend;