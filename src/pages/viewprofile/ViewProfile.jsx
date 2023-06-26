import './viewprofile.css';
import Rightbar from '../../components/rightbar/Rightbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../../components/auth/auth';

function ViewProfile() {
    const cookies = useCookies('_tk')[0]._tk;
    const userId = useParams().userId;
    const [user, setUser] = useState([]);
    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/profile-user/userId=' + userId;
        baseURL.get('/api/v1/profile-user/userId=' + userId, {
            headers: {
                Authorization: 'Bearer ' + cookies,
            }
        }).then((response) => { setUser(response.data); console.log(response.data) }).catch((error) => console.log(error))
        window.scrollTo(0, 0)
    }, [userId, cookies])

    return (
        <div className="viewProfile">
            <div className="viewprofileWrapper">
                <div className="viewprofileRight">
                    <div className="viewprofileRightTop">
                        <div className="viewprofileCover">
                            <img
                                className="viewprofileCoverImg"
                                src={user.coverImage}
                                alt=""
                            />
                            <img
                                className="viewprofileUserImg"
                                src={user.avatar}
                                alt=""
                            />
                        </div>
                        <div className="viewprofileInfo">
                            <h4 className="viewprofileInfoName">{user.displayName}</h4>
                            <span className="viewprofileInfoDesc">Doing!</span>
                        </div>
                    </div>
                    <div className="viewprofileRightBottom">
                        <div className='viewProfileFeed'>
                            {/* <Feed /> */}
                        </div>
                        <div className='viewProfileRightbar'>
                            <Rightbar profile userProfile={user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;