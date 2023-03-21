import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
import { useEffect } from "react";


export default function Rightbar({ profile, userProfile }) {

    useEffect(() => {

    })

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
            <div>
                <h4 className="rightbarTitle">Giới thiệu</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Thành phố:</span>
                        <span className="rightbarInfoValue">{userProfile.address}</span>
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
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <div className="rightbarFollowingsCotainerNameUser">
                            <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                        </div>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                    <div className="rightbarFollowing">
                        <div className="rightbarContainerImgUser">
                            <img
                                src="assets/person/1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                        </div>
                        <span className="rightbarFollowingName">Dương Nghĩa Hiệp</span>
                    </div>
                </div>
            </div>
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