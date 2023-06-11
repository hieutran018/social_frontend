import './messagesent.css';

function MessageSent({ message }) {
    return (
        <div className="itemSentMessage">
            <div className='itemSentMassageContent'>
                {message.content}
            </div>
            <img className='itemSentMessageAvatar' src={message.avatar} alt="" />
        </div>
    );
}

export default MessageSent;