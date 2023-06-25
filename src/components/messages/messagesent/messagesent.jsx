import './messagesent.css';

function MessageSent({ message }) {
    console.log(message);
    return (
        <div className="itemSentMessage">
            {
                message.content !== null ?
                    <div className='itemSentMassageContent'>
                        {message.content}
                    </div> :
                    <div className='itemSentMassageContentFile'>
                        {
                            message.media_file.map((file) => (
                                <img className='itemSentMessageFiles' src={file.media_file_name} alt="file message" />
                            ))
                        }
                    </div>
            }
            <img className='itemSentMessageAvatar' src={message.avatar} alt="" />
        </div>
    );
}

export default MessageSent;