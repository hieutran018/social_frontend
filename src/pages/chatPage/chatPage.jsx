import { useParams } from 'react-router-dom';
import './chatPage.css';
import avatar from '../../ckc_social_logo.png';
import MessageSent from '../../components/messages/messagesent/messagesent';
import MessageGet from '../../components/messages/messageget/messageget';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function ChatPage() {
    const userId = useParams().userId;
    const user = JSON.parse(localStorage.getItem('user')).id;
    const cookies = useCookies('_tk')[0]._tk;
    const [conversation, setConversation] = useState();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-message/userId=' + userId;
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies
            }
        }).then((response) => {
            setConversation(response.data.conversation)
            setMessages(response.data.message);
        }).catch((error) => {
            console.log(error);
        })
    }, [cookies, userId])

    return (
        <div className="chatPage">
            <div className="chatPageWrapper">
                <div className='chatPageTop'>
                    <img className='chatPageAvatar' src={conversation ? conversation.conversation_avatar : ""} alt="" />
                    <div className="chatPageName">
                        {conversation ? conversation.conversation_name : ""}
                    </div>
                </div>
                <div className="chatPageMain">
                    {
                        messages.map((message) => (
                            parseInt(message.user_id) === parseInt(user) ?
                                <MessageSent key={message.id} message={message} /> :
                                <MessageGet key={message.id} message={message} />
                        ))
                    }

                </div>
                <div className='chatPageBottom'>
                    <div className='chatPageInputContainer'>
                        <input className='chatPageInput' type="text" />
                        <button className='chatPageButtonSentMessage'>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;