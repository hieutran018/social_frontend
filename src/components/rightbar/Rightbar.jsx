import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect } from "react";


export default function Rightbar({ profile, userProfile }) {

    useEffect(() => {

    })

    const HomeRightbar = () => {
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
    };

    const ProfileRightbar = () => {
        return (
            <>
                <div className="rightbarContainer">
                    <div className="rightbarInfo">
                        <div className="rightbarInfoContent">
                            <h4 className="rightbarTitle">Giới thiệu</h4>

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
                    </div>
                </div>
                <div className="rightbarMargin"></div>
                <div className="rightbarContainer">
                    <div className="rightbarFriend">
                        <div className="rightbarFriendContent">
                            <div className="rightbarTitleContent"><h4 className="rightbarTitle">Bạn bè</h4><a href="/#" className="rightbarLinkViewMoreFriend">Xem tất cả bạn bè</a></div>
                            <div className="rightbarFriendContainer">
                                <div className="rightbarFollowings">
                                    <Grid container rowSpacing={1.7} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
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

                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightbarMargin"></div>
                <div className="rightbarContainer">
                    <div className="rightbarFriend">
                        <div className="rightbarFriendContent">
                            <div className="rightbarTitleContent"><h4 className="rightbarTitle">Ảnh</h4><a href="/#" className="rightbarLinkViewMoreFriend">Xem tất cả ảnh</a></div>
                            <div className="rightbarFriendContainer">
                                <div className="rightbarImgs">
                                    <Box sx={{ width: '100%' }}>
                                        <Grid container rowSpacing={0.5} columnSpacing={{ xs: 3, sm: 2, md: 2 }}>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>
                                            </div>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>

                                            </div>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>

                                            </div>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>

                                            </div>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>

                                            </div>
                                            <div className="rightbarImage">
                                                <div className="rightbarContainerImg">
                                                    <img
                                                        src="assets/person/1.jpeg"
                                                        alt=""
                                                        className="rightbarImg"
                                                    />
                                                </div>

                                            </div>

                                        </Grid>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className={profile ? "profileRightbarWrapper" : "homeRightbarWrapper"}>
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}