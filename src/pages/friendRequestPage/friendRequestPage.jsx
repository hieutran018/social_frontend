import './friendRequestPage.css';
import { useParams } from 'react-router-dom';
import ViewProfile from '../viewprofile/ViewProfile';

function FriendRequestPage() {
    const { userId } = useParams();
    return (
        <div className='friendRequestPage'>
            {
                userId ? <div className="friendRequestPageViewProfile">
                    <ViewProfile />
                </div> : <div className='friendRequestPageMain'>
                    <span className='friendRequestPageTextDescription'>Chọn tên của người mà bạn muốn xem trước trang cá nhân.</span>
                </div>
            }
        </div>
    );
}

export default FriendRequestPage;