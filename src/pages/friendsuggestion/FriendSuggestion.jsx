import './friendsuggestion.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import ViewProfile from '../viewprofile/ViewProfile';
// import Profile from '../profile/profile';


function FriendSuggestion({ page }) {
    const { userId } = useParams()
    return (
        <div className='friendsuggestion'>
            <div>
                <Topbar />
            </div>
            <div className="friendsuggestionContainer">
                <div className='friendsuggestionSidebar'>
                    <Sidebar page={4} isPages={true} />
                </div>
                {
                    userId ? <div className="friendSuggetstionViewProfile">
                        <ViewProfile />
                    </div> : <div className='friendSuggetstionMain'>
                        <span className='friendSuggetstionTextDescription'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default FriendSuggestion;