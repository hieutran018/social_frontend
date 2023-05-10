import './sidebarstories.css';
import { Link } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';
import { IoMdAdd } from 'react-icons/io';
import StoriesCard from './storiescard/storiescard';
import { useSelector } from 'react-redux';
import { selectStories } from '../../../redux/selectors/storiesSelector';

function SidebarListStory() {
    const stories = useSelector(selectStories);
    console.log(stories);
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
                    stories.map((item) => (
                        <StoriesCard story={item} key={item} />
                    ))
                }
            </div>
        </div>
    )
}
export default SidebarListStory;