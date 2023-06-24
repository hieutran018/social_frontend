import "./online.css";

function Online({ user }) {
    return (
        <li className="onlineRightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={user.avatar} alt="" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.displayName}</span>
        </li>
    );
}

export default Online;