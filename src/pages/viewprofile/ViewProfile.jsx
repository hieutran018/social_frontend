import './viewprofile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



function ViewProfile() {
    const userId = useParams().userId;
    const [user, setUser] = useState([]);
    console.log("LOG", userId);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile-user/userId=' + userId).then((response) => { setUser(response.data); console.log(response.data) }).catch((error) => console.log(error))

        window.scrollTo(0, 0)
    }, [userId])
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