import './sidebarchat.css';

import avatar from '../../../ckc_social_logo.png';
function ChatCard({ chat }) {
    return (
        <div className='chatItem'>
            <img className='chatItemAvatar' src={avatar} alt="" />
            <div className='chatItemName'>
                <div>Tran Duong Chi Hieu</div>
                <div className='chatItemChatLasted'>
                    Ban: Hom nay an gi vay?
                </div>
            </div>
        </div>
    );
}

export default ChatCard;