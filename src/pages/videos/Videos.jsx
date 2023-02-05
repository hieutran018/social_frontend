import './video.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Watch from '../../components/watch/Watch';

function Videos() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Watch />
            </div>
        </>
    );
}

export default Videos;