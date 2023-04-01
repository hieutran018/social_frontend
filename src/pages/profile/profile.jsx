import './profile.css';
import { useParams, Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Share from '../../components/share/Share';
import InforMationUser from '../../components/informationuser/informationuser';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusUser, selectUser } from '../../redux/selectors/postSelector';
import { fetchUser } from '../../redux/actions/userAction';


function Profile() {
    let { userId } = useParams();
    const [tab, setTab] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const status = useSelector(selectStatusUser);

    useEffect(() => {
        dispatch(fetchUser(userId));

    }, [userId, dispatch]);

    const hanleClickSelectTab = (tabIndex) => {
        setTab(tabIndex)
    }

    return (
        <>
            <Topbar />
            {
                status === 'loading' ?
                    <div></div> : status === 'success' ?
                        <div className="profile">
                            {/* <Sidebar /> */}
                            <div className="profileRight">
                                <div className="profileRightTop">
                                    <div className="profileCover">
                                        <img
                                            className="profileCoverImg"
                                            src={user.coverImage}
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
                                        <span className="profileInfoDesc">Hi</span>
                                    </div>
                                </div>
                                <div className='profileTabBar'>
                                    <div className='profileTabBarButton'>
                                        <Link className='profileTextLink' to={"/" + userId}><div onClick={() => hanleClickSelectTab(1)} className='profileTab'> <span className='profileTextTab'>Bài viết</span></div></Link>
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
                                            <Rightbar profile userProfile={user} />
                                        </div>
                                        : tab === 2 ? <div className="profileRightBottom"><InforMationUser user={user} /></div>
                                            : tab === 3 ? <div className="profileRightBottom"> <span>TAB 3</span></div>
                                                : tab === 4 ? <div className="profileRightBottom"> <span>TAB 4</span></div>
                                                    : <div className="profileRightBottom"> <span>TAB 5</span></div>
                                }
                            </div>
                        </div> : <div></div>
            }
        </>
    );
}

export default Profile;