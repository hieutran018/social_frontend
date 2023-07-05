import './messageget.css';
import Tooltip from '@mui/material/Tooltip';

function MessageGet({ message }) {
    return (
        <div className="itemGetMessage">
            <img className='itemGetMessageAvatar' src={message.avatar} alt="" />
            {
                message.content !== null ?
                    <Tooltip title="Add" placement="left">
                        <div className='itemGettMassageContent'>
                            {message.content}
                        </div>
                    </Tooltip> :
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