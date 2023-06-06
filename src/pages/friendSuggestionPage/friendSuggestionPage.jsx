import './friendSuggestionPage.css';
import { useParams } from 'react-router-dom';
import ViewProfile from '../viewprofile/ViewProfile';

function FriendSuggestionPage() {
    const { userId } = useParams();
    return (
        <div className='friendSuggestionPage'>
            {
                userId ? <div className="friendSuggestionPageViewProfile">
                    <ViewProfile />
                </div> : <div className='friendSuggestionPageMain'>
                    <span className='friendSuggestionPageTextDescription'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</span>
                </div>
            }
        </div>
    );
}

export default FriendSuggestionPage;