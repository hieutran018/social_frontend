import './storiesview.css';
import Topbar from '../../../components/topbar/Topbar';

import Sidebar from '../../../components/sidebar/Sidebar';
import StoryView from '../../../components/stories/view/storyview';

function StoriesView() {
    return (
        <div className='storiesView'>
            <div className="storiesViewTopbar">
                <Topbar />
            </div>
            <div className='storiesViewContainer'>
                <div>
                    <Sidebar page={9} />
                </div>
                <div className='storiesViewMain'>
                    <StoryView url type />
                </div>
            </div>
        </div>
    );
}

export default StoriesView;