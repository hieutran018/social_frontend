import './group.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';

function Group() {



    return (
        <div>
            <div className='groupTopBar'>
                <Topbar />
            </div>
            <div className='groupContainer'>
                <Sidebar page={5} />
                <div className="groupFeed">
                    <div className='groupFeedTitle'>Hoạt động gần đây</div>
                    <Feed />
                </div>
            </div>

        </div>
    );
}

export default Group;