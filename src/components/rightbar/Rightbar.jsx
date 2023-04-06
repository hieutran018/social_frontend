import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { selectStatusupdate } from "../../redux/selectors/postSelector";
import { useSelector } from "react-redux";
import RightbarProfile from './rightbarprofile/rightbarprofile'


export default function Rightbar({ profile, userProfile }) {
    const status = useSelector(selectStatusupdate);
    useEffect(() => {

    }, [status])

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

    return (
        <div className="rightbar">
            <div className={profile ? "profileRightbarWrapper" : "homeRightbarWrapper"}>
                {profile ? <RightbarProfile user={userProfile} /> : <HomeRightbar />}
            </div>
        </div>
    );
}