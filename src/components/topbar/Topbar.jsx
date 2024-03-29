import { Chat, Notifications } from '@mui/icons-material';
import { BsSearch } from 'react-icons/bs';
import { GrLinkNext } from 'react-icons/gr';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavItem from '../navitem/navitem';
import DropdownMenu from '../dropdownmenu/dropdownmenu';
import './topbar.css';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Notification from '../notification/notification';
import { RxDotFilled } from 'react-icons/rx';
import Message from '../../components/messages/messages';
import { baseURL } from '../auth/auth';
import audioMessage from '../../lottiefiles/audioMessage.mp3';


function Topbar({ pusher }) {
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user'));
    const [inputSearch, setInputSearch] = useState('');
    const [dataUsers, setDataUsers] = useState([]);
    const [searchTemp, setSearchTemp] = useState('');
    const typingTimeOutRef = useRef(null);
    const [openNoti, setOpenNoti] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [newNoti, setNewNoti] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const audio = new Audio(audioMessage);
    const channleNewConversation = pusher.subscribe('new-conversation-' + user.id);

    const channel = pusher.subscribe('notif-' + user.id);
    const channelMessage = pusher.subscribe('message-' + user.id);

    channel.bind('my-event', function (data) {
        setNewNoti(true);
        console.log(data);
    });

    channelMessage.bind('my-message', function (data) {
        setNewMessage(true);
        audio.play()
    });
    channleNewConversation.bind('my-conversation-event', function (data) {
        setNewMessage(true);
        audio.play()
    });

    const handleOpenNoti = () => {
        setOpenNoti(true);
        setNewNoti(false);
    }

    const handleCloseNoti = () => {
        setOpenNoti(false);
    }

    const handleOpenChat = () => {
        setOpenChat(true);
        setNewMessage(false);
    }

    const handleCloseChat = () => {
        setOpenChat(false);
    }

    const handleChangeSearch = (event) => {
        setSearchTemp(event.target.value);
        if (!event.target.value) {
            setDataUsers([])
        } else {
            setInputSearch(event.target.value);
            //? ĐẶT LẠI THỜI GIAN ĐỢI CHO VIỆC GÕ
            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current);
            }
            typingTimeOutRef.current = setTimeout(() => {
                searchData(event.target.value);
            }, 300)
        }
    }

    function searchData(input) {
        // const requestURL = 'https://ckcsocial.site/api/v1/search-users-and-groups/input=' + input;
        baseURL.get('/api/v1/search-users-and-groups/input=' + input, {
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setDataUsers(response.data.users);
            console.log(response.data.users);
        }).catch((error) => console.log(error));
    }

    const handleCloseData = () => {
        setDataUsers([]);
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" className="sidebarLogo">
                    {<span className="logo">CKCS</span>}
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <BsSearch size={25} className="searchIcon" />
                    <input
                        value={searchTemp}
                        onChange={handleChangeSearch}
                        placeholder="Tìm kiếm bạn bè..."
                        className="searchInput"
                    />
                    {
                        dataUsers.length === 0 ?
                            <></> :
                            <div className='dataResult'>
                                <div className='dataResultContainer'>
                                    {
                                        dataUsers.map((item) => (
                                            <div key={item.id} className='dataCard'>
                                                <div className='dataCardLeft'>
                                                    <img className='dataAvatar' src={item.avatar} alt="" />
                                                </div>
                                                <div className='dataCardRight'>
                                                    <div className='dataName'>{item.displayName}</div>
                                                    <Link onClick={handleCloseData} to={'/userId/' + item.id}>
                                                        <div className='dataButtonNextSearch'>
                                                            <GrLinkNext size={25} />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Link className='dataCardLink' onClick={handleCloseData} style={{ textDecoration: "none" }} to={"/search/" + inputSearch}>
                                        <div className='dataCardSearchFor'>
                                            <div className='dataIconSearchFor'>
                                                <BsSearch size={25} className="searchIcon" />
                                            </div>
                                            <div className='dataCardRight'>
                                                <div className='dataNameSearchFor'>Tìm kiếm kết quả cho "{inputSearch}"</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <div onClick={!openChat ? handleOpenChat : handleCloseChat}>
                            <Chat fontSize='25' style={{ position: "relative" }} />
                            {
                                newMessage ?
                                    <RxDotFilled color='red' style={{
                                        position: "relative",
                                        left: "-18px",
                                        bottom: "8"
                                    }} /> :
                                    <></>
                            }
                            <Message pusher={pusher} close={openChat} />
                        </div>
                    </div>
                    <div className="topbarIconItem">
                        <div onClick={!openNoti ? handleOpenNoti : handleCloseNoti}>
                            <Notifications fontSize='25' style={{ position: "absolute" }} />
                            {
                                newNoti ?
                                    <RxDotFilled color='red' style={{
                                        position: "relative",
                                        left: "7",
                                        bottom: "8"
                                    }} /> :
                                    <></>
                            }
                            <Notification close={openNoti} channel={channel} />
                        </div>

                    </div>
                </div>
                <NavItem icon={<ArrowDropDownIcon />}>
                    <DropdownMenu />
                </NavItem>
            </div>
        </div>
    );
}

export default Topbar;