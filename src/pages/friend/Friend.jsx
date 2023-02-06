import './friend.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Friends from '../../components/Friends/Friends';

function Friend() {
    return (
        <>
            <div>
                <Topbar />
            </div>

            <div className="friendContainer">
                <Sidebar page={3} />
                <Friends />
            </div>
        </>
    );
}

export default Friend;