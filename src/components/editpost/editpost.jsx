import './editpost.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BsSearch } from 'react-icons/bs';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ShowMoreText from "react-show-more-text";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { IoMdClose } from 'react-icons/io';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditPostSkeleton from './editPostSkeleton';
import { useDispatch } from 'react-redux';
import { editPost } from '../../redux/actions/postAction';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

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
    const [privacy, setPrivacy] = useState();
    const [listIcon, setListIcon] = useState([]);
    const [inputSearchIcon, setInputSearchIcon] = useState('');
    const typingTimeOutRef = useRef(null);
    const [resultIcon, setResultIcon] = useState([]);
    const [faa, setFaa] = useState();
    const [removeFile, setRemoveFile] = useState([]);
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
    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }
    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }
    const handleChangeRemoveFile = (file) => {
        console.log("FILE SERVER", file);
        removeFile.push(file.id);
        setFiles(files.filter(f => f.id !== file.id));

        setChangeFile(Array.from(changeFile).filter(f => { //? Tử kiểu File List -> Array -> gán cho changeFile list đã lọc ra
            return f.name !== file.id;
        }));

    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = [];
            const targetFiles = e.target.files;
            const targetFilesObject = [...targetFiles]
            targetFilesObject.map((file) => {
                return selectedFiles.push({ id: file.name, media_file_name: URL.createObjectURL(file) })
            })
            setChangeFile(e.target.files);
            setFiles([...files, ...selectedFiles]);
            console.log(changeFile);
        }
    };

    const handleEditPost = () => {
        dispatch(editPost(cookies, postId, content, changeFile, privacy, tagged, faa.id, removeFile))
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

    const handleClickFellingandActivity = () => {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-fell-and-activity-posts";
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            setListIcon(response.data);
            setTab(2);
        }).catch((error) => console.log(error));
    }
    const handleSelectIcon = (icon) => {
        setFaa(icon);
        setTab(0);
    }

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
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setResultIcon(response.data);
            console.log(response.data);
        }).catch((error) => console.log(error));
    }

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
            setPrivacy(response.data.privacy);
            setFaa(response.data.icon);
            response.data.tag.map((tag) => {
                return tagged.push(tag.user_id);
            })
        }).catch((error) => {
            navigate('/login');
        })
    }, [cookies, postId, navigate]);
    console.log(faa);
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
                            <p className='editPostUserName'>{post.displayName} {post.icon ? <span className='editPostWithText'> đang cảm thấy <img width={20} height={20} src={faa.patch} alt="" /> <span className='editPostUserName'>{faa.icon_name}</span></span> : ""} {tags.length === 0 ? "" : <span className='editPostWithText'> cùng với <span className='editPostUserName'>{tags.length + " người khác"}</span></span>}</p>
                            <div className='editPostPrivacy' onClick={handleClick}>
                                {privacy === 2 ? <PeopleAltIcon /> : privacy === 0 ? <LockPersonIcon /> : <PublicIcon />}
                                <span>{privacy === 2 ? 'Bạn bè' : privacy === 0 ? 'Chỉ mình tôi' : 'Công khai'}</span>
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
                            <MenuItem onClick={() => hanldeSelectPrivacy(1)}>Công khai</MenuItem>
                            <MenuItem onClick={() => hanldeSelectPrivacy(2)}>Bạn bè</MenuItem>
                            <MenuItem onClick={() => hanldeSelectPrivacy(0)}>Chỉ mình tôi</MenuItem>
                        </Menu>
                    </div>
                    <div>
                        <textarea value={content} onChange={handleChangeContent} aria-multiline className='editPostContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
                    </div>
                    <div>
                        {
                            post.parent_post ? <div className="postParent">
                                <div className="postShareWrapper">
                                    <div className="postShareCenter">
                                        <div>
                                            {post.parent_post.totalMediaFile === 1 ?
                                                <div>
                                                    {
                                                        post.parent_post.mediafile[0].media_type === 'mp4' ? <video loop className="postVideo" src={post.parent_post.mediafile[0].media_file_name} controls></video> :
                                                            <img className="postShareImg" src={post.parent_post.mediafile[0].media_file_name} alt="" />
                                                    }
                                                </div>
                                                : post.parent_post.totalMediaFile === 2 ?
                                                    <ImageList sm={{ width: "100%", height: "100%" }} cols={2} rowHeight={400}>
                                                        {post.parent_post.mediafile.map((item) => (
                                                            <ImageListItem key={item.media_file_name}>
                                                                {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                    src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                    srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                    alt={item.title}
                                                                    loading="lazy"
                                                                />}
                                                            </ImageListItem>
                                                        ))}
                                                    </ImageList> : post.parent_post.totalMediaFile === 3 ?
                                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={300}>
                                                            {post.parent_post.mediafile.map((item) => (
                                                                <ImageListItem key={item.media_file_name}>
                                                                    {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />}
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList> :
                                                        <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight={350}>
                                                            {post.parent_post.mediafile.map((item) => (
                                                                <ImageListItem key={item.media_file_name}>
                                                                    {item.media_type === 'mp4' ? <video loop className="postVideo" src={item.media_file_name} controls></video> : <img
                                                                        src={`${item.media_file_name}?w=164&h=164&fit=crop&auto=format`}
                                                                        srcSet={`${item.id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                                        alt={item.title}
                                                                        loading="lazy"
                                                                    />}
                                                                </ImageListItem>
                                                            ))}
                                                        </ImageList>
                                            }
                                        </div>
                                    </div>
                                    <div className="postShareTop">
                                        {
                                            post.parent_post.group_id ?
                                                <div className="postTopLeft">
                                                    <a href={"/" + post.parent_post.group_id}>
                                                        <img
                                                            className="postProfileImgGroup"
                                                            src={post.parent_post.groupAvatar}
                                                            alt={"Avatar user " + post.parent_post.groupName}
                                                        />
                                                    </a>
                                                    <div>
                                                        <span className="postUsername">
                                                            <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                {post.parent_post.groupName}
                                                            </a>
                                                        </span>
                                                        <div className="postPrivacy">
                                                            <span className="postMemberGroup">
                                                                <a className="postLinkProfileMemberGroup" href={"/userId/" + post.parent_post.user_id}>
                                                                    {post.parent_post.displayName}
                                                                </a>
                                                            </span>
                                                            <span className="postDateGroup">{moment(post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                {post.parent_post.privacy.toString() === "0" ?
                                                                    <LockIcon className="postIconPrivacy" /> :
                                                                    post.parent_post.privacy.toString() === "1" ? <PublicIcon className="postIconPrivacy" />
                                                                        : <GroupIcon className="postIconPrivacy" />
                                                                }</span>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div className="postTopLeft">
                                                    <a href={"/userId/" + post.parent_post.user_id}>
                                                        <img
                                                            className="postProfileImg"
                                                            src={post.parent_post.avatarUser}
                                                            alt={"Avatar user " + post.parent_post.displayName}
                                                        />
                                                    </a>
                                                    <div>
                                                        <div className="postUsername">
                                                            <a className="postLinkProfileUser" href={"/userId/" + post.parent_post.user_id}>
                                                                {post.parent_post.displayName} {post.parent_post.iconName ? <span className='postWithText'>đang cảm thấy <img width={20} height={20} src={post.parent_post.iconPatch} alt="" /> <span className='postTagUser'>{post.parent_post.iconName}</span></span> : ""} {post.parent_post.tag.length === 0 ? "" : <span className="postWithText">cùng với <span className="postTagUser">{post.parent_post.tag.length + " người khác"}</span></span>}
                                                            </a>
                                                        </div>
                                                        <div className="postPrivacy">
                                                            <span className="postshareDate">{moment(post.parent_post.created_at, 'YYYYMMDD h:mm:ss').fromNow()}
                                                                {post.parent_post.privacy === 0 ? <LockIcon className="postIconPrivacy" /> : post.parent_post.privacy === 1 ? <PublicIcon className="postIconPrivacy" /> : <GroupIcon className="postIconPrivacy" />}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                    <div>
                                        <ShowMoreText
                                            /* Default options */
                                            lines={1}
                                            more="xem thêm"
                                            less="ẩn bớt"
                                            className="postText"
                                            anchorClass="postViewMore"
                                            onClick={executeOnClick}
                                            expanded={false}
                                            truncatedEndingComponent={"... "}
                                        ><p>{post.parent_post.post_content}</p>
                                        </ShowMoreText>
                                    </div>
                                </div>
                            </div>
                                : <></>
                        }
                    </div>
                    <div className='editPostMediaFile'>
                        {
                            files.length !== 0 ?
                                <div><button onClick={() => handleChangeTab(3)} className='editPostRemoveMediaFile'>Xóa ảnh/video</button></div>
                                : <></>
                        }
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
                            <div onClick={handleClickFellingandActivity} ><EmojiEmotions style={{ fontSize: "35" }} htmlColor="goldenrod" className="editPostIcon" /></div>
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
                        tab === 2 ?
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
                                                                <div style={{ backgroundColor: faa ? (faa.id === item.id ? "#c0c1c3" : "") : "" }} className='dialogShareFeelingAndActivytiCard'>
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
                                                                <div style={{ backgroundColor: faa ? (faa.id === item.id ? "#c0c1c3" : "") : "" }} className='dialogShareFeelingAndActivytiCard'>
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
                            <div>
                                <div className='dialogShareTaggingTitle'>
                                    <div className='editPostRemoveDescription'>
                                        Xóa ảnh/video
                                    </div>
                                    <div className='dialogShareDoneTagging'>
                                        <button onClick={handleCloseTag} className='dialogShareDoneTaggingButton'>Xong</button>
                                    </div>
                                </div>
                                <div className='editPostRemoveFileContainer'>
                                    {
                                        files.map((file) => (
                                            <div className='editPostRemoveFileCard'>
                                                <img className='editPostRemoveFileItems' src={file.media_file_name} alt="" />
                                                <button onClick={() => handleChangeRemoveFile(file)} className='editPostRemoveFilesButton'>Xóa ảnh</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> :
                    <EditPostSkeleton />
            }
        </div>
    );

}

export default EditPost;