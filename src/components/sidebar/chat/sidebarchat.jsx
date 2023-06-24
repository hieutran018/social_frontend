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
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((chat) => (
                                <ChatCard key={chat} chat={chat} />
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