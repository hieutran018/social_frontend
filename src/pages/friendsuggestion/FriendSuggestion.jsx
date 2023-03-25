import './friendsuggestion.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';


function FriendSuggestion() {
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="friendsuggestionContainer">
                <Sidebar />
                <div className='friendSuggetstionMain'>
                    <span className='friendSuggetstionTextDescription'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</span>
                </div>
            </div>
        </>
    );
}

export default FriendSuggestion;