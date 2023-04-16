import './video.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Watch from '../../components/watch/Watch';

function Videos() {
    return (
        <div>
            <Topbar />
            <div className="videoContainer">
                <Sidebar page={2} />
                <div className='videoWatchFeed'>
                    <Watch />
                </div>
            </div>
        </div>
    );
}

export default Videos;