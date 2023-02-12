import './viewprofile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';


function ViewProfile() {
    return (
        <>
            <div className="viewProfileContainer">
                <div className="profile">
                    {/* <Sidebar /> */}
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img
                                    className="profileCoverImg"
                                    src="assets/post/3.jpeg"
                                    alt=""
                                />
                                <img
                                    className="profileUserImg"
                                    src="assets/person/7.jpeg"
                                    alt=""
                                />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">Trần Dương Chí Hiếu</h4>
                                <span className="profileInfoDesc">Doing!</span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed />
                            <Rightbar profile />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewProfile;