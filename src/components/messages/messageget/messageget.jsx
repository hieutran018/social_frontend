import './messageget.css';

function MessageGet({ message }) {
    console.log(message);
    return (
        <div className="itemGetMessage">
            <img className='itemGetMessageAvatar' src={message.avatar} alt="" />
            {
                message.content !== null ?
                    <div style={{ maxWidth: '50%' }}>
                        <div className='itemGetMessageUserName'>
                            {
                                message.userName
                            }
                        </div>
                        <div className='itemGetMassageContent'>
                            {message.content}
                        </div>
                    </div>
                    :
                    <div className='itemGetMassageContentFile'>
                        {
                            message.media_file.map((file) => (
                                file.media_type === 'mp4' ?
                                    <video controls key={file.id} className='itemGetMessageFiles' src={file.media_file_name}></video> :
                                    <img key={file.id} className='itemGetMessageFiles' src={file.media_file_name} alt="file message" />
                            ))
                        }
                    </div>
            }
        </div>
    );
}

export default MessageGet;