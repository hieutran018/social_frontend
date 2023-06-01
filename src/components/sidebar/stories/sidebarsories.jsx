import './sidebarstories.css';
import { Link } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import image from '../../../ckc_social_logo.png';

function SidebarStories() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className='sidebarStories'>
            <div className="titlesidebarStories">
                <div>
                    <Link to="/">
                        <ArrowBack className='iconBack' />
                    </Link> <span>Câu chuyện của bạn</span>
                </div>

            </div>
            <div className='sidebarStoryUser'>
                <img className='sidebarStoryAvatar' src={user.avatar} alt="" />
                <div className='sidebarStoryUserName'>{user.displayName}</div>

            </div>
        </div>
    )
}
export default SidebarStories;