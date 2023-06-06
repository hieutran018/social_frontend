import "./rightbar.css";
import { Users } from "../../data";
import Online from "../online/Online";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { selectStatusupdate } from "../../redux/selectors/postSelector";
import { useSelector } from "react-redux";
import HomeRightbar from "./homerightbar/homerightbar"
import RightbarProfile from './rightbarprofile/rightbarprofile'


export default function Rightbar({ profile }) {
    const status = useSelector(selectStatusupdate);
    useEffect(() => {

    }, [status])

    return (
        <div className="rightbar">
            <div className={profile ? "profileRightbarWrapper" : "homeRightbarWrapper"}>
                {profile ? <RightbarProfile user={profile} /> : <HomeRightbar />}
            </div>
        </div>
    );
}