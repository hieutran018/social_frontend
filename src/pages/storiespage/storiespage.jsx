import './storiespage.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CreateStory from '../../components/stories/create/create';

function StoriesPage() {
    return (
        <div className='storiespage'>
            <div className="storiespageTopbar">
                <Topbar />
            </div>
            <div className='storiespageContainer'>
                <div>
                    <Sidebar page={8} />
                </div>
                <div className='storiespageMain'>
                    <CreateStory />
                </div>
            </div>
        </div>
    )
}

export default StoriesPage;