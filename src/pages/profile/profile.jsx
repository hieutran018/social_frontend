import './profile.css';
import { useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
// import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Share from '../../components/share/Share';
import { useEffect, useState } from 'react';

function Profile() {
    let { userId } = useParams();
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        async function fetchProfileUser() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId })
            };
            const requestURL = "http://127.0.0.1:8000/api/profile-user";
            const response = await fetch(requestURL, requestOptions);
            const responseJson = await response.json();
            setProfile(responseJson);
        }
        fetchProfileUser();

    }, [userId]);

    return (
        <>
            <Topbar />
            <div className="profile">
                {/* <Sidebar /> */}
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={profile.coverImage}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={profile.avatar}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{profile.username}</h4>
                            <span className="profileInfoDesc"></span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <div className='profileFeed'>
                            <Share />
                            <Feed />
                        </div>
                        <Rightbar profile userProfile={profile} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;