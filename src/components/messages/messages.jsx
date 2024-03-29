import './messages.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats, selectStatusChats } from '../../redux/selectors/chatSelector';
import { fetchChat, createChat } from '../../redux/actions/chatAction';
import { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import Nodata from '../../lottiefiles/nomessage.json';

function Message({ pusher, close }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectStatusChats);
    const chats = useSelector(selectChats);

    const channleNewConversation = pusher.subscribe('new-conversation-' + user.id);
    channleNewConversation.bind('my-conversation-event', function (data) {
        dispatch(createChat(data.conversation))
    });

    useEffect(() => {
        dispatch(fetchChat(cookies));
    }, [dispatch, cookies]);

    return (
        close ?
            <div className='messages' >
                {
                    status === 'loading' ?
                        <>LOADING</> :
                        status === 'succeeded' ?
                            (
                                chats.length === 0 ?
                                    <div>
                                        <div className='messageTitleBox'>Trò chuyện</div>
                                        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                                            <Lottie
                                                loop
                                                animationData={Nodata}
                                                play
                                                style={{ width: 400, height: 300 }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                                            <span style={{ color: "black", fontSize: "25px", fontWeight: "500" }}>Chưa có cuộc trò chuyện nào!</span>
                                        </div>
                                        <Link to="/chats" className='messageGotoChatsContainer'><span className='messageGotoChats'>Đi đến trò chuyện</span></Link>
                                    </div>
                                    :
                                    <div className='messages-list'>
                                        <div className='messageTitleBox'>Trò chuyện</div>
                                        {
                                            chats.map((chat) => (
                                                <Link key={chat.id} style={{ textDecoration: "none" }} to={"/chats/" + chat.id}>
                                                    <div className='messagesItem' >
                                                        <div className='messagesHeader'>
                                                            <img className="messagesAvatar" src={chat.conversation_avatar} alt="" />
                                                            <div className="messagesContent">
                                                                <span className="messagesMessage"><span className='messagesUserName'>{chat.conversation_name}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                        <Link to="/chats" className='messageGotoChatsContainer'><span className='messageGotoChats'>Đi đến trò chuyện</span></Link>
                                    </div>
                            ) :
                            status === 'failed' ?
                                <>FAILED</> :
                                <></>
                }


            </div> :
            <></>
    );
}

export default Message;