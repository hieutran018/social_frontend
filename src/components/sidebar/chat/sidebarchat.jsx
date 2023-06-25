import './sidebarchat.css';
import { Link } from 'react-router-dom';
import ChatCard from './chatcard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat } from '../../../redux/actions/chatAction';
import { selectChats, selectStatusChats } from '../../../redux/selectors/chatSelector';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function SidebarChat() {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const status = useSelector(selectStatusChats);
    const chats = useSelector(selectChats);
    useEffect(() => {
        dispatch(fetchChat(cookies));
    }, [dispatch, cookies]);
    return (
        <div className="sidebarChat">
            <div className="sidebarChatTitle">
                <Link to="/friend"></Link> Trò chuyện
            </div>
            <div className='sidebarChatItemsList'>
                {
                    status === 'loading' ?
                        <>LOADING</> :
                        status === 'succeeded' ?
                            chats.map((chat) => (
                                <ChatCard key={chat.id} chat={chat} />
                            )) :
                            status === 'failed' ?
                                <>FAILED</> :
                                <></>
                }

            </div>
        </div>
    )
}
export default SidebarChat;