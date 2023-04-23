import './viewprofile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function ViewProfile() {
    let { userId } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.post('http://127.0.0.1:8000/api/profile-user', {
            userId: userId,
        }).then((response) => { setUser(response.data); console.log(response.data) }).catch((error) => console.log(error))

        window.scrollTo(0, 0)
    }, [userId])
    return (
        <div className="viewProfile">

            <div className="viewprofileWrapper">
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
                            <h4 className="profileInfoName">{user.displayName}</h4>
                            <span className="profileInfoDesc">Doing!</span>
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