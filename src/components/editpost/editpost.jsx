import './editpost.css';
import { useCallback, useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { IoMdClose } from 'react-icons/io';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditPostSkeleton from './editPostSkeleton';
import { useDispatch } from 'react-redux';
import { editPost } from '../../redux/actions/postAction';
import { useNavigate } from 'react-router-dom';

function EditPost({ postId }) {
    const navigate = useNavigate();
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [post, setPost] = useState();
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [changeFile, setChangeFile] = useState([]);
    const [tab, setTab] = useState(0);
    const [listFr, setListFr] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagged, setTagged] = useState([]);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChangeTab = (tab) => {
        setTab(tab);
    }
    const handleCloseTag = () => {
        setTab(0)
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = [];
            const targetFiles = e.target.files;
            const targetFilesObject = [...targetFiles]
            targetFilesObject.map((file) => {
                return selectedFiles.push(URL.createObjectURL(file))
            })
            setChangeFile(e.target.files);
            setFiles([...files, ...selectedFiles]);
            console.log(files);
        }
    };

    const handleEditPost = () => {
        dispatch(editPost(cookies, postId, content, changeFile, 1, tagged, 1))
    }

    const handleClickTag = () => {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-friend-by-user-id/" + user.id;
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            const result = response.data.data.filter(item1 =>
                !tags.some(item2 => item1.friendId === item2.user_id)
            );
            console.log(result, tags);
            setListFr(result);
            setTab(1);
        }).catch((error) => console.log(error));
    }

    const handleTaggingUser = (friend) => {
        if (friend.friendId) {
            tags.push(friend);
            tagged.push(friend.friendId);
            setListFr((listFr) =>
                listFr.filter((fr) => fr.friendId !== friend.friendId)
            );
            console.log(tags, tagged);
        } else {
            tags.push(friend);
            tagged.push(friend.user_id);
            setListFr((listFr) =>
                listFr.filter((fr) => fr.user_id !== friend.user_id)
            );
            console.log(tags, tagged);
        }

    }

    const handlUndoTaggingUser = (friend) => {
        console.log("CHECK UNDO", friend);
        if (friend.friendId) {
            console.log(friend, tags, "FRIENDID 1");
            setTags((taggingList) =>
                taggingList.filter((tagging) => tagging.friendId !== friend.friendId)
            );

            setTagged(
                tagged.filter((t) => t !== friend.friendId)
            );
        } else {
            console.log(friend, "FRIENDID 2");
            setTags((taggingList) =>
                taggingList.filter((tagging) => tagging.user_id !== friend.user_id)
            );
            setTagged(
                tagged.filter((t) => t !== friend.user_id)
            );
        }

        setListFr([...listFr, friend])
    }
    console.log("TAGGED", tagged);
    const fetchPost = useCallback(() => {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-post-by-id/postId=" + postId;
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies
            }
        }).then((response) => {
            setPost(response.data);
            console.log(response.data);
            setContent(response.data.post_content);
            setFiles(response.data.mediafile);
            setTags(response.data.tag);
            response.data.tag.map((tag) => {
                return tagged.push(tag.user_id);
            })
        }).catch((error) => {
            navigate('/login');
        })
    }, [cookies, postId, navigate]);

    useEffect(() => {
        fetchPost()
    }, [fetchPost])
    return (
        <div className='editPost'>
            {
                post ? tab === 0 ? <div className='editPostWrapper'>
                    <div className="editContent">
                        <div className='editPostImgAvatarContainer'><img className='editPostImgAvatar' src={post.avatarUser} alt="logo" /></div>
                        <div className="editDetails">
                            <p className='editPostUserName'>{post.displayName} {post.icon ? <span className='editPostWithText'> đang cảm thấy <img width={20} height={20} src={post.iconPatch} alt="" /> <span className='editPostUserName'>{post.iconName}</span></span> : ""} {tags.length === 0 ? "" : <span className='editPostWithText'> cùng với <span className='editPostUserName'>{tags.length + " người khác"}</span></span>}</p>
                            <div className='editPostPrivacy' onClick={handleClick}>
                                {post.privacy === 2 ? <PeopleAltIcon /> : post.privacy === 0 ? <LockPersonIcon /> : <PublicIcon />}
                                <span>{post.privacy === 2 ? 'Bạn bè' : post.privacy === 0 ? 'Chỉ mình tôi' : 'Công khai'}</span>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem >Công khai</MenuItem>
                            <MenuItem >Bạn bè</MenuItem>
                            <MenuItem >Chỉ mình tôi</MenuItem>
                        </Menu>
                    </div>
                    <div>
                        <textarea value={content} onChange={handleChangeContent} aria-multiline className='editPostContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
                    </div>
                    <div>
                        {
                            files ?
                                files.map((file) => (
                                    file.media_file_name ? <img className='editPostMediaFileItem' src={file.media_file_name} alt="" /> :
                                        <img className='editPostMediaFileItem' src={file} alt="" />
                                )) :
                                <></>
                        }
                    </div>
                    <div className="editPostOptionsContainer">
                        <div className='editPostDescriptionContainer'><p className='editPostDescrion'>Thêm vào bài viết của bạn</p></div>
                        <div className="editPostOptions">
                            <label onChange={handleFileChange} htmlFor='uploadFiles' ><input type="file" multiple id="uploadFiles" hidden /><PermMedia style={{ fontSize: "35" }} htmlColor="tomato" className="shareIcon" /></label>
                            <div><Room style={{ fontSize: "35" }} htmlColor="green" className="editPostIcon" /></div>
                            <div onClick={() => handleChangeTab(2)} ><EmojiEmotions style={{ fontSize: "35" }} htmlColor="goldenrod" className="editPostIcon" /></div>
                            <div onClick={handleClickTag}><LocalOfferIcon style={{ fontSize: "35" }} htmlColor="blue" className="editPostIcon" /></div>
                        </div>
                    </div>
                    <div className='editPostButtonContainer'>
                        <button onClick={handleEditPost} className="editPostButton" >Đăng</button>
                    </div>
                </div> :
                    tab === 1 ? <div>
                        <div className='dialogShareTaggingTitle'>
                            <span style={{ fontSize: "20px", fontWeight: "500" }}>Gắn thẻ người khác</span>
                            <div className='dialogShareDoneTagging'>
                                <button onClick={handleCloseTag} className='dialogShareDoneTaggingButton'>Xong</button>
                            </div>
                        </div>
                        {
                            tags.length === 0 ? <></> :
                                <div>
                                    <div className='dialogShareUserTagging'>
                                        {
                                            tags.map((friend, index) => (
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
                    </div> :
                        <>TAB TAG</> :
                    <EditPostSkeleton />
            }
        </div>
    );

}

export default EditPost;