import { useParams } from 'react-router-dom';
import './chatPage.css';
import avatar from '../../ckc_social_logo.png';


function ChatPage() {
    const chatid = useParams().chatId;

    return (
        <div className="chatPage">
            <div className="chatPageWrapper">
                <div className='chatPageTop'>
                    <img className='chatPageAvatar' src={avatar} alt="" />
                    <div className="chatPageName">
                        Tran Duong Chi Hieu
                    </div>
                </div>
                <div className="chatPageBottom">
                    <div className="itemSentMessage">
                        <img className='itemSentMessageAvatar' src={avatar} alt="" />
                        <div className='itemSentMassageContent'>
                            Hom nay an gi vay ?
                        </div>
                    </div>
                    <div className="itemGetMessage">
                        <div className='itemGetMassageContent'>
                            Hom nay an gi vay ?
                        </div>
                        <img className='itemGetMessageAvatar' src={avatar} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;