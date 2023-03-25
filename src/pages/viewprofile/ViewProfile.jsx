import './viewprofile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function ViewProfile() {
    let { Id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/api/profile-user', {
            userId: Id,
        }).then((response) => { setUser(response.data); console.log(response.data) }).catch((error) => console.log(error))
        window.scrollTo(0, 0)
    }, [Id])
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="viewProfile">
                <Sidebar />
                <div className="viewProfileContainer">
                    <div className="viewprofile">
                        <div className="profileRight">
                            <div className="profileRightTop">
                                <div className="profileCover">
                                    <img
                                        className="profileCoverImg"
                                        src={user.avatar}
                                        alt=""
                                    />
                                    <img
                                        className="profileUserImg"
                                        src={user.avatar}
                                        alt=""
                                    />
                                </div>
                                <div className="profileInfo">
                                    <h4 className="profileInfoName">{user.username}</h4>
                                    <span className="profileInfoDesc">Doing!</span>
                                </div>
                            </div>
                            <div className="profileRightBottom">
                                <Feed />
                                <div className='viewProfileRightbar'>
                                    <Rightbar profile userProfile={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ViewProfile;