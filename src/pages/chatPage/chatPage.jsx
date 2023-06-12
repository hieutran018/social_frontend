import { useParams } from 'react-router-dom';
import './chatPage.css';
import MessageSent from '../../components/messages/messagesent/messagesent';
import MessageGet from '../../components/messages/messageget/messageget';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function ChatPage({ pusher }) {
    const userId = useParams().userId;
    const user = JSON.parse(localStorage.getItem('user')).id;
    const cookies = useCookies('_tk')[0]._tk;
    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);
    const [contentMessage, setContentMessage] = useState('');

    const channel = pusher.subscribe('conversation-' + conversation.id);
    channel.bind('message', function (data) {
        setMessages([data.message, ...messages]);
        console.log(data, "PUSHER");
    });


    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-message/userId=' + userId;
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setConversation(response.data.conversation)
            setMessages(response.data.message);
        }).catch((error) => {
            console.log(error);
        })
    }, [cookies, userId])

    const handleChangeContentMessage = (e) => {
        setContentMessage(e.target.value);
    }


    const sendMessage = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/chats/send-message';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                conversationId: conversation.id,
                contentMessage: contentMessage
            },
            headers: {
                Authorization: 'Bearer ' + cookies,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            setContentMessage('');

        }).catch((error) => {
            console.log(error);
        })
    }

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
                        <input value={contentMessage} onChange={handleChangeContentMessage} className='chatPageInput' type="text" />
                        <button onClick={sendMessage} className='chatPageButtonSentMessage'>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;