import '../rightbar.css';
import { Users } from "../../../data";
import Online from "../../online/Online";

function HomeRightbar() {
    return (
        <div className="homeRightbar">
            <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                    <b>Dương Nghĩa Hiệp</b> và <b>3 người bạn khác</b> sinh nhật hôm nay.
                </span>
            </div>
            {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
            <h4 className="rightbarTitle">Người liên hệ</h4>
            <ul className="rightbarFriendList">
                {Users.map((u) => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
        </div>
    );
}


export default HomeRightbar;