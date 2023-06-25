import './messageget.css';

function MessageGet({ message }) {
    return (
        <div className="itemGetMessage">
            <img className='itemGetMessageAvatar' src={message.avatar} alt="" />
            {
                message.content !== null ?
                    <div className='itemGettMassageContent'>
                        {message.content}
                    </div> :
                    <div className='itemGetMassageContentFile'>
                        {
                            message.media_file.map((file) => (
                                <img className='itemGetMessageFiles' src={file.media_file_name} alt="file message" />
                            ))
                        }
                    </div>
            }
        </div>
    );
}

export default MessageGet;