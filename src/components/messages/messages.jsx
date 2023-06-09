import './messages.css';
import { Link } from 'react-router-dom';
import avatar from '../../ckc_social_logo.png';

function Message({ close }) {
    return (
        close ?
            <div className='messages' >
                <div className='messages-list'>
                    {
                        [0, 1, 2, 3, 4, 5, 6].map((notification) => (

                            <div key={notification.id} className='messagesItem' >
                                <div className='messagesHeader'>
                                    <img className="messagesAvatar" src={avatar} alt="" />
                                    <div className="messagesContent">
                                        <span className="messagesMessage"><span className='messagesUserName'>Tran Duong Chi Hieu</span></span>
                                    </div>
                                </div>

                            </div>

                        ))
                    }
                </div>

            </div> :
            <></>
    );
}

export default Message;