import './closefriend.css';
import { GrNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function CloseFriend({ group }) {
    return (
        <Link style={{ textDecoration: "none", color: "black" }} to={"/groups/group/" + group.id}>
            <div className="sidebarGroupCard">

                <div className='sidebarGroupContainer'>
                    <img className="sidebarFriendImg" src={group.avatar} alt="" />
                    <span className="sidebarFriendName">{group.group_name}</span>

                </div>
                <div className='sidebarGroupButton'>
                    <div className='sidebarGroupButtonNext'>
                        <GrNext size={20} />
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default CloseFriend;