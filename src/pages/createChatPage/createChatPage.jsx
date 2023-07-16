import { useRef, useState } from 'react';
import './createChatPage.css';
import { baseURL } from '../../components/auth/auth';
import { useCookies } from 'react-cookie';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChatRoom } from '../../redux/actions/chatAction';

function CreateChatPage({ pusher }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const typingTimeOutRef = useRef(null);
    const [searchTemp, setSearchTemp] = useState('');
    const [dataUsers, setDataUsers] = useState([]);
    const [contentMessage, setContentMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [view, setView] = useState(false);
    const [members, setMembers] = useState([]);
    const [userAdded, setUserAdded] = useState([]);
    const navigate = useNavigate();
    const handleChangeSearch = (event) => {
        setSearchTemp(event.target.value);
        if (!event.target.value) {
            setDataUsers([])
        } else {
            setInput(event.target.value);
            //? ĐẶT LẠI THỜI GIAN ĐỢI CHO VIỆC GÕ
            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current);
            }
            typingTimeOutRef.current = setTimeout(() => {
                searchData(event.target.value);
            }, 300)
        }
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

    const handleChangeContentMessage = (e) => {
        setContentMessage(e.target.value);
    }

    const sendMessage = () => {
        if (contentMessage !== '') {
            baseURL.post('/api/v1/chats/create-group-chat', {
                contentMessage: contentMessage,
                members: members
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "multipart/form-data",
                }
            }).then((response) => {
                setContentMessage('');
                navigate('/chats/' + response.data.id);
                dispatch(createChatRoom(response.data))
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

    function searchData(input) {
        // const requestURL = 'https://ckcsocial.site/api/v1/friend/search-friend/input=' + input;
        baseURL.get('/api/v1/friend/search-friend/input=' + input, {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setDataUsers(response.data);
            console.log(response.data);
        }).catch((error) => console.log(error));
    }

    const handleAddUser = (friend) => {
        setUserAdded([...userAdded, friend])
        setMembers([...members, friend.friendId])
        setDataUsers(dataUsers.filter((user) => user.friendId !== friend.friendId))
        setInput('');
        setSearchTemp('');
    }
    const handleRemoveUser = (friend) => {
        setUserAdded((userAdded) =>
            userAdded.filter((add) => add.friendId !== friend.friendId)
        );

        setMembers((adding) =>
            adding.filter((add) => add !== friend.friendId)
        );
    }

    return (
        <div className='createChatPage'>
            <div className='createChatPageNewChat'>
                <div>Đến:</div>
                <div className='createChatPageInputSearchContainer'>
                    <div className='createChatPageMemberChat'>
                        {
                            userAdded.map((user) => (
                                <div key={user.friendId} className='createChatPageMemberChatUserAdded'>
                                    {user.displayName}
                                    <div onClick={() => handleRemoveUser(user)}>
                                        <GrClose className='createChatPageIconRemoveUsers' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='createChatPageSearchFriendChat'>
                        <input onChange={handleChangeSearch} value={searchTemp} className='createChatPageInputSearch' type="text" name="" id="" />
                        <div className='createChatPageSearchFriend'>
                            {
                                dataUsers.length > 0 ?
                                    <div className='createChatPageSearchFriendResult'>
                                        {
                                            dataUsers.map((user) => (
                                                <div onClick={() => handleAddUser(user)} key={user.friendId} className='createChatPageSearchFriendItem'>
                                                    <div className='createChatPageSearchFriendItemContainer'>
                                                        <img className='createChatPageSearchFriendItemAvatarUser' src={user.avatar} alt="" />
                                                        <div>
                                                            {user.displayName}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div> : <></>
                            }
                        </div>
                    </div>
                </div>
                {
                    members.length > 0 ? <div className='createChatPageBottom'>
                        <div>
                            {view ?
                                <div className='createChatPagePreviewFilesUpload'>
                                    {
                                        images.map((item) => (
                                            item.type === 'image/jpeg' || item.type === 'image/png' || item.type === 'image/png' ||
                                                item.type === 'image/svg' || item.type === 'image/gif' ?
                                                <img
                                                    className="createChatPageImg"
                                                    src={item.url}
                                                    srcSet={item.url}
                                                    alt={item}
                                                    loading="lazy"
                                                /> :
                                                <video controls className="createChatPageImg" src={item.url}></video>
                                        ))
                                    }
                                </div>
                                : <div></div>}
                        </div>
                        <div className='createChatPageBottomChangeInput'>
                            <label onChange={handleFileChange} className='createChatPageInputContainerSentFile' htmlFor="sentFiles"> <AiOutlineFileAdd size={25} /><input id='sentFiles' type="file" multiple hidden /></label>
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
                            } value={contentMessage} onChange={handleChangeContentMessage} className='createChatPageInput' type="text" />
                            <button onClick={sendMessage} className='createChatPageButtonSentMessage'>Gửi</button>
                        </div>

                    </div> :
                        <></>
                }
            </div>
        </div>
    );
}

export default CreateChatPage;