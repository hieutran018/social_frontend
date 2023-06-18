import './messages.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats, selectStatusChats } from '../../redux/selectors/chatSelector';
import { fetchChat } from '../../redux/actions/chatAction';
import { useEffect } from 'react';

function Message({ close }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectStatusChats);
    const chats = useSelector(selectChats);
    useEffect(() => {
        dispatch(fetchChat(cookies));
    }, [dispatch, cookies]);
    return (
        close ?
            <div className='messages' >
                <div className='messages-list'>
                    {
                        status === 'loading' ?
                            <>LOADING</> :
                            status === 'succeeded' ?
                                chats.map((chat) => (
                                    <Link style={{ textDecoration: "none" }} to={"/chats/" + chat.userId}>
                                        <div key={chat.id} className='messagesItem' >
                                            <div className='messagesHeader'>
                                                <img className="messagesAvatar" src={chat.conversation_avatar} alt="" />
                                                <div className="messagesContent">
                                                    <span className="messagesMessage"><span className='messagesUserName'>{chat.conversation_name}</span></span>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                )) :
                                status === 'failed' ?
                                    <>FAILED</> :
                                    <></>
                    }
                </div>

            </div> :
            <></>
    );
}

export default Message;