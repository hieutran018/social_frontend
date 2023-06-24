import './messageget.css';

function MessageGet({ message }) {
    return (
        <div className="itemGetMessage">
            <img className='itemGetMessageAvatar' src={message.avatar} alt="" />
            <div className='itemGetMassageContent'>
                {message.content}
            </div>
        </div>
    );
}

export default MessageGet;