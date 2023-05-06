import './sidebarstories.css';
import { Link } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { IoMdSettings } from 'react-icons/io';
import image from '../../../ckc_social_logo.png';

function SidebarStories() {
    return (
        <div className='sidebarStories'>
            <div className="titlesidebarStories">
                <div>
                    <Link to="/">
                        <ArrowBack className='iconBack' />
                    </Link> <span>Câu chuyện của bạn</span>
                </div>
                <div>
                    <IoMdSettings size={30} />
                </div>
            </div>
            <div className='sidebarStoryUser'>
                <img className='sidebarStoryAvatar' src={image} alt="" />
                <div className='sidebarStoryUserName'>Trần Dương Chí Hiếu</div>

            </div>
        </div>
    )
}
export default SidebarStories;