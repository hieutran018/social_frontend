import './dialogshare.css'
import axios from 'axios';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import { addNewPost } from '../../redux/actions/postAction'
import { selectAddPostStatus } from '../../redux/selectors/postSelector';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function DialogShare({ group }) {
    const cookies = useCookies('_tk');
    const user = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [privacy, setPrivacy] = useState(1);
    const [view, setView] = useState(false);
    const open = Boolean(anchorEl);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const statusAdd = useSelector(selectAddPostStatus);
    const [checkClick, setCheckClick] = useState(true);
    const [tab, setTab] = useState(0);
    const [listFr, setListFr] = useState([]);
    const [listIcon, setListIcon] = useState([]);
    const [taggingList, setTaggingList] = useState([]);
    const [taggingId, setTaggingId] = useState([]);
    const [inputContentPost, setInputContentPost] = useState();
    const [selectIcon, setSelectIcon] = useState();
    const [inputSearchIcon, setInputSearchIcon] = useState('');
    const [resultIcon, setResultIcon] = useState([]);
    const typingTimeOutRef = useRef(null);
    const handleChangeSearch = (event) => {
        setInputSearchIcon(event.target.value)
        if (!event.target.value) {
            setResultIcon([])
        } else {
            setInputSearchIcon(event.target.value);
            //? ĐẶT LẠI THỜI GIAN ĐỢI CHO VIỆC GÕ
            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current);
            }
            typingTimeOutRef.current = setTimeout(() => {
                searchIcon(event.target.value);

            }, 300)
        }

    }

    function searchIcon(input) {
        const requestURL = 'http://127.0.0.1:8000/api/v1/search-feel-and-activity-posts/search=' + input;

        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setResultIcon(response.data);
            console.log(response.data);
        }).catch((error) => console.log(error));
    }
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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }

    const handleChangeContent = (e) => {
        setInputContentPost(e.target.value)
    }
    const submitPost = () => {
        if (inputContentPost === '' && files == null) {
            return;
        }
        setCheckClick(false);
        dispatch(addNewPost(cookies[0]._tk, inputContentPost, files, privacy, taggingId, group, selectIcon ? selectIcon.id : null));
        setInputContentPost('');
        setFiles([]);
        setImages([]);
    }

    const handleTaggingUser = (friend) => {
        setTaggingList([...taggingList, friend])
        setTaggingId([...taggingId, friend.id])
        setListFr((listFr) =>
            listFr.filter((fr) => fr.id !== friend.id)
        );
    }
    const handlUndoTaggingUser = (friend) => {
        setTaggingList((taggingList) =>
            taggingList.filter((tagging) => tagging.id !== friend.id)
        );
        setTaggingId((taddingId) =>
            taddingId.filter((tagging) => tagging !== friend.id)
        );
        setListFr([...listFr, friend])
    }
    const handleCloseTag = () => {
        setTab(0)
    }
    const handleClickTag = () => {

        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-friend-by-user-id/" + user.id;

        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            setListFr(response.data.data);
            setTab(1);
        }).catch((error) => console.log(error));
    }
    const handleClickFellingandActivity = () => {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-fell-and-activity-posts";

        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            setListIcon(response.data);
            setTab(2);
            console.log(selectIcon);
        }).catch((error) => console.log(error));
    }

    const handleSelectIcon = (icon) => {
        setSelectIcon(icon);
        setTab(0);
    }

    return (
        <div className='dialogShare'>
            <DialogTitle style={{ padding: "0px" }}>
                <div className='contaierHeader'>
                    <span className='shareTitle'>Tạo bài viết</span>
                </div>
            </DialogTitle>

            <div className='dialogShareHr'></div>
            <DialogContent style={{ padding: "0px" }}>
                <div className="wrapper">
                    {
                        tab === 0 ?
                            statusAdd === 'adding' ?
                                <div className='dialogshareLoading'>
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={100} />
                                    </Box>
                                </div> : (statusAdd === 'succeeded' || !statusAdd) && checkClick ? <div>
                                    <div className="content">
                                        <div className='shareImgAvatarContainer'><img className='shareImgAvatar' src={user.avatar} alt="logo" /></div>

                                        <div className="details">
                                            <p className='shareUserName'>{user.displayName} {selectIcon ? <span className='shareWithText'>đang cảm thấy <img width={20} height={20} src={selectIcon.patch} alt="" /> <span className='shareUserName'>{selectIcon.icon_name}</span></span> : ""} {taggingList.length === 0 ? "" : <span className='shareWithText'> cùng với <span className='shareUserName'>{taggingList.length + " người khác"}</span></span>}</p>
                                            <div className='privacy' onClick={handleClick}>
                                                {privacy === 2 ? <PeopleAltIcon /> : privacy === 0 ? <LockPersonIcon /> : <PublicIcon />}
                                                <span>{privacy === 2 ? 'Bạn bè' : privacy === 0 ? 'Chỉ mình tôi' : 'Công khai'}</span>
                                                <ArrowDropDownIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea value={inputContentPost} aria-multiline onChange={handleChangeContent} className='shareContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
                                    </div>
                                    <div>
                                        {view ?
                                            <div className='previewFilesUpload'>

                                                {images.length === 1 ?
                                                    <div>
                                                        <img className="postImg" src={images[0]} alt="" />
                                                    </div>
                                                    : images.length === 2 ?
                                                        <ImageList sx={{ width: "100%", height: "70%" }} cols={3} rowHeight={200}>
                                                            {images.map((item, i) => (
                                                                <ImageListItem key={i}>
                                                                    <img
                                                                        src={item}
                                                                        srcSet={item}
                                                                        alt={item}
                                                                        loading="lazy"
                                                                    />
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList> : images.length === 3 ?
                                                            <ImageList sx={{ width: "100%", height: "70%" }} cols={3} rowHeight={200}>
                                                                {images.map((item, i) => (
                                                                    <ImageListItem key={i}>
                                                                        <img
                                                                            src={item}
                                                                            srcSet={item}
                                                                            alt={item}
                                                                            loading="lazy"
                                                                        />
                                                                    </ImageListItem>
                                                                ))}
                                                            </ImageList> :
                                                            <ImageList sx={{ width: "100%", height: "70%" }} cols={3} rowHeight={200}>
                                                                {images.map((item, i) => (
                                                                    <ImageListItem key={i}>
                                                                        <img
                                                                            src={item}
                                                                            srcSet={item}
                                                                            alt={item}
                                                                            loading="lazy"
                                                                        />
                                                                    </ImageListItem>
                                                                ))}
                                                            </ImageList>}

                                                <button >
                                                    Remove This Image
                                                </button>
                                            </div>
                                            : <div></div>}
                                    </div>
                                    <div className="optionsContainer">
                                        <div className='shareDescriptionContainer'><p className='shareDescrion'>Thêm vào bài viết của bạn</p></div>
                                        <div className="options">

                                            <label htmlFor='uploadFiles' onChange={handleFileChange}><input type="file" multiple id="uploadFiles" hidden /><PermMedia style={{ fontSize: "35" }} htmlColor="tomato" className="shareIcon" /></label>


                                            <div><Room style={{ fontSize: "35" }} htmlColor="green" className="shareIcon" /></div>


                                            <div onClick={handleClickFellingandActivity}><EmojiEmotions style={{ fontSize: "35" }} htmlColor="goldenrod" className="shareIcon" /></div>
                                            {
                                                group ? <></> : <div onClick={handleClickTag}><LocalOfferIcon style={{ fontSize: "35" }} htmlColor="blue" className="shareIcon" /></div>
                                            }


                                        </div>
                                    </div>
                                    <div className='shareButtonContainer'>
                                        <button onClick={submitPost} disabled={!inputContentPost && files.length === 0} className={!inputContentPost && files.length === 0 ? "shareButton disablebutton" : "shareButton"} >Đăng</button>
                                    </div>



                                    <div>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => hanldeSelectPrivacy(1)} >Công khai</MenuItem>
                                            <MenuItem onClick={() => hanldeSelectPrivacy(2)} >Bạn bè</MenuItem>
                                            <MenuItem onClick={() => hanldeSelectPrivacy(0)}>Chỉ mình tôi</MenuItem>
                                        </Menu>

                                    </div>
                                </div> : <div className='dialogshareLoading'>
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={100} />
                                    </Box>
                                </div> : tab === 1 ?
                                <div>
                                    <div className='dialogShareTaggingTitle'>
                                        <span style={{ fontSize: "20px", fontWeight: "500" }}>Gắn thẻ người khác</span>
                                        <div className='dialogShareDoneTagging'>
                                            <button onClick={handleCloseTag} className='dialogShareDoneTaggingButton'>Xong</button>
                                        </div>
                                    </div>
                                    {
                                        taggingList.length === 0 ? <></> :
                                            <div>
                                                <div className='dialogShareUserTagging'>
                                                    {
                                                        taggingList.map((friend, index) => (
                                                            <div key={index} className='dialogShareTaggingUser'>
                                                                <div>
                                                                    {
                                                                        friend.displayName
                                                                    }
                                                                </div>
                                                                <div onClick={() => handlUndoTaggingUser(friend)} className='dialogShareUndoTaggingUser'>
                                                                    <IoMdClose size={20} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                    }
                                    <div>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            {
                                                listFr.map((fr) => (
                                                    <ListItem onClick={() => handleTaggingUser(fr)} className='dialogShareTagUserCard'>
                                                        <img className='dialogshareTagUserAvatar' src={fr.avatar} alt="" />
                                                        <ListItemText primary={fr.displayName} secondary="" />
                                                    </ListItem>
                                                ))
                                            }

                                        </List>
                                    </div>
                                </div> : tab === 2 ?
                                    <div className='dialogShareFeelingandActivity'>
                                        <DialogTitle style={{ padding: "0px" }}>
                                            <div className='dialogShareFeelingandActivityTitle'>
                                                <span style={{ fontSize: "20px", fontWeight: "500" }}>Bạn đang cảm thấy như thế nào?</span>
                                            </div>
                                            <div className='dialogShareSearchFeelingAndActivityContainer'>
                                                <BsSearch size={25} /> <input onChange={handleChangeSearch} value={inputSearchIcon} type="text" className='dialogShareSearchFeelingAndActivity' />
                                            </div>
                                        </DialogTitle>
                                        <DialogContent style={{ padding: "0px" }}>
                                            <div className='dialogShareFeelingAndActivityMain'>
                                                <div className='dialogShareFeelingAndActivityList'>
                                                    {
                                                        resultIcon.length === 0 ? <Grid container rowSpacing={0.5} columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                                            {
                                                                listIcon.map((item) => (
                                                                    <Grid onClick={() => handleSelectIcon(item)} key={item.id} item xs={6}>
                                                                        <div style={{ backgroundColor: selectIcon ? (selectIcon.id === item.id ? "#c0c1c3" : "") : "" }} className='dialogShareFeelingAndActivytiCard'>
                                                                            <div className='dialogShareFeelingAndActivytiIcon'>
                                                                                <img className='dialogShareFeelingAndActivytiImage' src={item.patch} alt="" />
                                                                            </div>
                                                                            <div className='dialogShareFeelingAndActivytiName'>{item.icon_name}</div>
                                                                        </div>
                                                                    </Grid>
                                                                ))
                                                            }


                                                        </Grid> : <Grid container rowSpacing={0.5} columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}>
                                                            {
                                                                resultIcon.map((item) => (
                                                                    <Grid onClick={() => handleSelectIcon(item)} key={item.id} item xs={6}>
                                                                        <div style={{ backgroundColor: selectIcon ? (selectIcon.id === item.id ? "#c0c1c3" : "") : "" }} className='dialogShareFeelingAndActivytiCard'>
                                                                            <div className='dialogShareFeelingAndActivytiIcon'>
                                                                                <img className='dialogShareFeelingAndActivytiImage' src={item.patch} alt="" />
                                                                            </div>
                                                                            <div className='dialogShareFeelingAndActivytiName'>{item.icon_name}</div>
                                                                        </div>
                                                                    </Grid>
                                                                ))
                                                            }


                                                        </Grid>
                                                    }

                                                </div>
                                            </div>
                                        </DialogContent>
                                    </div> :
                                    <div></div>
                    }

                </div>
            </DialogContent>
        </div >
    );
}


export default DialogShare;