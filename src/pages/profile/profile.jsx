import './profile.css';
import { useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
// import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Share from '../../components/share/Share';
import InforMationUser from '../../components/informationuser/informationuser';
import { useEffect, useState } from 'react';

function Profile() {
    let { userId } = useParams();
    const [profile, setProfile] = useState([]);
    const [tab, setTab] = useState(1);
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

    const hanleClickSelectTab = (tabIndex) => {
        setTab(tabIndex)
    }

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
                            <span className="profileInfoDesc">Hi</span>
                        </div>
                    </div>
                    <div className='profileTabBar'>
                        <div className='profileTabBarButton'>
                            <div onClick={() => hanleClickSelectTab(1)} className='profileTab'> <span className='profileTextTab'>Bài viết</span></div>
                            <div onClick={() => hanleClickSelectTab(2)} className='profileTab'> <span className='profileTextTab'>Giới thiệu</span></div>
                            <div onClick={() => hanleClickSelectTab(3)} className='profileTab'> <span className='profileTextTab'>Bạn bè</span></div>
                            <div onClick={() => hanleClickSelectTab(4)} className='profileTab'> <span className='profileTextTab'>Ảnh</span></div>
                            <div onClick={() => hanleClickSelectTab(5)} className='profileTab'> <span className='profileTextTab'>Video</span></div>
                        </div>
                    </div>
                    {
                        tab === 1 ?
                            <div className="profileRightBottom">
                                <div className='profileFeed'>
                                    <Share />
                                    <Feed />
                                </div>
                                <Rightbar profile userProfile={profile} />
                            </div>
                            : tab === 2 ? <div className="profileRightBottom"><InforMationUser idUser={profile.id} profile={profile} /></div>
                                : tab === 3 ? <div className="profileRightBottom"> <span>TAB 3</span></div>
                                    : tab === 4 ? <div className="profileRightBottom"> <span>TAB 4</span></div>
                                        : <div className="profileRightBottom"> <span>TAB 5</span></div>
                    }
                </div>
            </div>
        </>
    );
}

export default Profile;