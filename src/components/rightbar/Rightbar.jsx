import "./rightbar.css";
import HomeRightbar from "./homerightbar/homerightbar"
import RightbarProfile from './rightbarprofile/rightbarprofile'

export default function Rightbar({ profile, user }) {
    return (
        <div className="rightbar">
            <div className={profile ? "profileRightbarWrapper" : "homeRightbarWrapper"}>
                {profile ? <RightbarProfile user={user} /> : <HomeRightbar />}
            </div>
        </div>
    );
}