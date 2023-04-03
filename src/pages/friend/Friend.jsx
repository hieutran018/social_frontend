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
                <div >
                    <Sidebar page={3} />
                </div>
                <div className='friendMainContainer'>
                    <Friends />
                </div>

            </div>
        </>
    );
}

export default Friend;