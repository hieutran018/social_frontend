import './storiesview.css';
import Topbar from '../../../components/topbar/Topbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import StoryView from '../../../components/stories/view/storyview';
import { useSelector } from 'react-redux';
import { selectStories } from '../../../redux/selectors/storiesSelector';
import { useParams } from 'react-router-dom';


function StoriesView() {
    const storiesCurrent = useParams().storiesCurrent;

    const stories = useSelector(selectStories);

    return (
        <div className='storiesViewPage'>
            <StoryView story={stories.filter((story) => story.id.toString() === storiesCurrent)} />
        </div>
    );
}

export default StoriesView;