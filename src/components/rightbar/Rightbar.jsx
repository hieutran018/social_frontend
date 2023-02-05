import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
    const HomeRightbar = () => {
        return (
            <>
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
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">Giới thiệu</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Thành phố:</span>
                        <span className="rightbarInfoValue">Hồ Chí Minh</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Đến từ:</span>
                        <span className="rightbarInfoValue">Vĩnh Long</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Mối quan hệ:</span>
                        <span className="rightbarInfoValue">Độc thân</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">Bạn bè</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/1.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/2.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Nguyễn Công Chính</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/3.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Nguyễn Nhan Gia Bảo</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/4.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Nguyễn Minh Hiếu</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/5.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Trần Đình Thủ</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/6.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">Huỳnh Nguyễn Vân Anh</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}