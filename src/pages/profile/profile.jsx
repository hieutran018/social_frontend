import './profile.css';
import { useParams, Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Share from '../../components/share/Share';
import InforMationUser from '../../components/informationuser/informationuser';
import FriendList from '../../components/Friends/friendlist/friendlist';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusUser, selectUser } from '../../redux/selectors/postSelector';
import { fetchUser } from '../../redux/actions/userAction';


function Profile() {
    const { userId } = useParams();
    const { page } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const status = useSelector(selectStatusUser);

    useEffect(() => {
        dispatch(fetchUser(userId));

    }, [userId, dispatch]);



    return (
        <>
            <Topbar />
            {
                status === 'loading' ?
                    <div></div> : status === 'success' ?
                        <div className="profile">

                            <div className="profileRight">
                                <div className="profileRightTop">
                                    <div className="profileCover">
                                        <img
                                            className="profileCoverImg"
                                            src={status === "loading" ? user.coverImage : user.coverImage}
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
                                        <Link className='profileTextLink' to={"/" + userId}><div className={page ? 'profileTab' : 'profileTab active'}> <span className='profileTextTab'>Bài viết</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/about"}><div className={page === 'about' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Giới thiệu</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/friends"}><div className={page === 'friends' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Bạn bè</span></div></Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/photos"}><div className={page === 'photos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Ảnh</span></div> </Link>
                                        <Link className='profileTextLink' to={"/" + userId + "/videos"}><div className={page === 'videos' ? 'profileTab active' : 'profileTab'}> <span className='profileTextTab'>Video</span></div></Link>
                                    </div>
                                </div>
                                {
                                    page === 'about' ?
                                        <div className="profileRightBottom"><InforMationUser user={user} /></div>

                                        : page === 'friends' ? <div className="profileRightBottom"> <FriendList /></div>
                                            : page === 'photos' ? <div className="profileRightBottom"> <span>TAB PHOTOS</span></div>
                                                : page === 'videos' ? <div className="profileRightBottom"> <span>TAB VIDEOS</span></div>
                                                    :
                                                    <div className="profileRightBottom">
                                                        <div className='profileFeed'>
                                                            <Share />
                                                            <Feed />
                                                        </div>
                                                        <Rightbar profile userProfile={user} />
                                                    </div>
                                }
                            </div>
                        </div> : <div></div>
            }
        </>
    );
}

export default Profile;