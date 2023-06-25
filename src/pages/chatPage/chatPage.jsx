import { useParams } from 'react-router-dom';
import './chatPage.css';
import MessageSent from '../../components/messages/messagesent/messagesent';
import MessageGet from '../../components/messages/messageget/messageget';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { requestDev } from '../../components/auth/auth';
import { AiOutlineFileAdd } from 'react-icons/ai';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function ChatPage({ pusher }) {
    const userId = useParams().userId;
    const user = JSON.parse(localStorage.getItem('user')).id;
    const cookies = useCookies('_tk')[0]._tk;
    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);
    const [contentMessage, setContentMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [view, setView] = useState(false);

    const channel = pusher.subscribe('conversation-' + conversation.id);
    channel.bind('message', function (data) {
        setMessages([data.message, ...messages]);
        console.log(data, "PUSHER");
    });


    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFIles = [];
            const targetFiles = e.target.files;
            const targetFilesObject = [...targetFiles]
            targetFilesObject.map((file) => {
                return selectedFIles.push(URL.createObjectURL(file))
            })
            setFiles(e.target.files);
            setImages(selectedFIles);
            setView(true)
        }
    };



    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-message/userId=' + userId;
        requestDev.get('/v1/fetch-message/userId=' + userId, {
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
        window.scrollTo(0, 9999999999);
    }, [cookies, userId])

    const handleChangeContentMessage = (e) => {
        setContentMessage(e.target.value);
    }


    const sendMessage = () => {
        requestDev.post('/v1/chats/send-message', {
            conversationId: conversation.id,
            contentMessage: contentMessage,
        }, {
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
        if (files.length > 0) {
            sendMessageHaveFile();
        }
    }

    const sendMessageHaveFile = () => {

        requestDev.post('/v1/chats/sent-message-file', {
            conversationId: conversation.id,
            files: files
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            setContentMessage('');
            setImages([]);
            setView(false);
            setFiles([]);

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
                    <div>
                        {view ?
                            <div className='chatPagePreviewFilesUpload'>
                                {
                                    images.map((item) => (
                                        <img
                                            className="chatPageImg"
                                            src={item}
                                            srcSet={item}
                                            alt={item}
                                            loading="lazy"
                                        />
                                    ))
                                }
                            </div>
                            : <div></div>}
                    </div>
                    <div className='chatPageBottomChangeInput'>
                        <label onChange={handleFileChange} className='chatPageInputContainerSentFile' htmlFor="sentFiles"> <AiOutlineFileAdd size={25} /><input id='sentFiles' type="file" multiple hidden /></label>
                        <input onKeyDownCapture={
                            event => {
                                if (event.key === 'Enter') {
                                    if (contentMessage !== null) {
                                        sendMessage()
                                    }
                                    if (files.length > 0) {
                                        sendMessageHaveFile()
                                        console.log("CO FILE");
                                    }

                                }
                            }
                        } value={contentMessage} onChange={handleChangeContentMessage} className='chatPageInput' type="text" />
                        <button onClick={sendMessage} className='chatPageButtonSentMessage'>Gửi</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChatPage;