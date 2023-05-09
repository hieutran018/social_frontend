import './sidebarstories.css';
import { Link } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { IoMdAdd } from 'react-icons/io';
import StoriesCard from './storiescard/storiescard';

function SidebarListStory() {
    return (
        <div className='sidebarStories'>
            <div className="titlesidebarStories">
                <div>
                    <Link to="/">
                        <ArrowBack className='iconBack' />
                    </Link> <span>Câu chuyện</span>
                </div>
            </div>
            <Link className='sidebarunLink' to="/stories/create">
                <div className='sidebarStoryUser'>
                    <div className='sidebarListStoryNewIcon'>
                        <IoMdAdd size={30} />
                    </div>
                    <div className='sidebarStoryUserName'>Thêm tin mới</div>

                </div>
            </Link>
            <div className="titlesidebarStories marginTop">
                <div>
                    Tất cả câu chuyện
                </div>

            </div>
            <div className='sidebarListStory'>
                {
                    [0, 1, 2, 3].map((item) => (
                        <StoriesCard key={item} />
                    ))
                }
            </div>
        </div>
    )
}
export default SidebarListStory;