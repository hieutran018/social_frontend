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
                                file.media_type === 'mp4' ?
                                    <video controls key={file.id} className='itemSentMessageFiles' src={file.media_file_name}></video> :
                                    <img key={file.id} className='itemSentMessageFiles' src={file.media_file_name} alt="file message" />
                            ))
                        }
                    </div>
            }
        </div>
    );
}

export default MessageSent;