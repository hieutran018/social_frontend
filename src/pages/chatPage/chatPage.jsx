import { Link, useParams } from 'react-router-dom';
import './chatPage.css';
import MessageSent from '../../components/messages/messagesent/messagesent';
import MessageGet from '../../components/messages/messageget/messageget';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../../components/auth/auth';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { GrNext, GrDown } from 'react-icons/gr';
import avatar from '../../ckc_social_logo.png';
import Files from './files/files';
import MemberChat from './members/members';

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
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);

    if (conversation) {
        const channel = pusher.subscribe('conversation-' + conversation.id);
        channel.bind('message', function (data) {
            setMessages([data.message, ...messages]);
            console.log(data, "PUSHER");
        });
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpenMember = () => {
        setOpenMember(true);
    }
    const handleCloseMember = () => {
        setOpenMember(false);
    }

    const handleFileChange = (e) => {

        if (e.target.files) {
            const selectedFIles = [];
            const targetFiles = e.target.files;
            const targetFilesObject = [...targetFiles]
            targetFilesObject.map((file) => {
                return selectedFIles.push({
                    type: file.type,
                    url: URL.createObjectURL(file)
                })
            })
            console.log(targetFilesObject);
            setFiles(e.target.files);
            setImages(selectedFIles);
            setView(true)
        }
    };
    console.log(images);
    useEffect(() => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-message/userId=' + userId;
        if (userId) {
            baseURL.get('/api/v1/fetch-message/userId=' + userId, {
                headers: {
                    Authorization: "Bearer " + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                setConversation(response.data.conversation)
                setMessages(response.data.message);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
            window.scrollTo(0, 9999999999);
        }
    }, [cookies, userId])

    const handleChangeContentMessage = (e) => {
        setContentMessage(e.target.value);
    }

    const sendMessage = () => {
        if (contentMessage !== '') {
            baseURL.post('/api/v1/chats/send-message', {
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
        }

        if (view) {
            sendMessageHaveFile();
        }
    }

    const sendMessageHaveFile = () => {

        baseURL.post('/api/v1/chats/sent-message-file', {
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
            {
                userId ?
                    <div className="chatPageWrapper">
                        <div className="chatPageMainContent">
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
                                                    item.type === 'image/jpeg' || item.type === 'image/png' || item.type === 'image/png' ||
                                                        item.type === 'image/svg' || item.type === 'image/gif' ?
                                                        <img
                                                            className="chatPageImg"
                                                            src={item.url}
                                                            srcSet={item.url}
                                                            alt={item}
                                                            loading="lazy"
                                                        /> :
                                                        <video controls className="chatPageImg" src={item.url}></video>
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
                                                if (contentMessage !== '') {
                                                    sendMessage();
                                                }
                                                if (view) {
                                                    sendMessageHaveFile();
                                                }
                                            }
                                        }
                                    } value={contentMessage} onChange={handleChangeContentMessage} className='chatPageInput' type="text" />
                                    <button onClick={sendMessage} className='chatPageButtonSentMessage'>Gửi</button>
                                </div>

                            </div>
                        </div>
                        <div className='chatPageInfoContent'>
                            <div className='chatPageInfoContentTop'>
                                <img className='chatPageAvatarChatInfo' src={conversation ? conversation.conversation_avatar : '...'} alt="" />
                                <span className='chatPageNameChatInfo'>{conversation ? conversation.conversation_name : '...'}</span>
                            </div>
                            <div className='chatPageOptions'>
                                {
                                    conversation.userId ? <Link to={"/userId/" + conversation.userId} className='chatPageOption chatPageOptionRemoveLink'>
                                        Trang cá nhân
                                    </Link> :
                                        <></>
                                }
                                {
                                    parseInt(conversation.conversation_type) === 1 ?
                                        <div onClick={openMember ? handleCloseMember : handleOpenMember} className='chatPageOption'>
                                            Thành viên
                                            {
                                                openMember ? <GrDown /> : <GrNext />
                                            }
                                        </div> :
                                        <></>
                                }
                                <div className='chatPageShowMemberChats'>
                                    {
                                        openMember ?
                                            <MemberChat conversation={conversation ? conversation.id : null} /> :
                                            <></>
                                    }
                                </div>
                                <div onClick={open ? handleClose : handleOpen} className='chatPageOption'>
                                    Lưu trữ tệp
                                    {
                                        open ? <GrDown /> : <GrNext />
                                    }
                                </div>

                                <div className='chatPageShowFiles'>
                                    {
                                        open ?
                                            <Files conversation={conversation ? conversation.id : null} /> :
                                            <></>
                                    }
                                </div>

                            </div>
                        </div>
                    </div> :
                    <div className="chatPageWrapper chatPageDescriptEmptyContainer">
                        <div className="chatPageDescriptEmpty">
                            Hãy mời bạn bè của bạn cùng nhau trò chuyện!
                        </div>
                    </div>
            }

        </div>
    );
}

export default ChatPage;