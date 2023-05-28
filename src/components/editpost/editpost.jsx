import './editpost.css';
import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditPostSkeleton from './editPostSkeleton';
import { useDispatch } from 'react-redux';
import { editPost } from '../../redux/actions/postAction';

function EditPost({ postId }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [post, setPost] = useState();
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [changeFile, setChangeFile] = useState([]);
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
        dispatch(editPost(cookies, postId, 'UPDATE 4', [], 1, [2, 3, 4], 1))
    }
    useEffect(() => {
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
        }).catch((error) => {
            console.log(error);
        })
    }, [postId, cookies])
    return (
        <div className='editPost'>
            {
                post ? <div className='editPostWrapper'>
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
                        <textarea value={content} aria-multiline className='editPostContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
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


                            <div ><EmojiEmotions style={{ fontSize: "35" }} htmlColor="goldenrod" className="editPostIcon" /></div>

                            <div><LocalOfferIcon style={{ fontSize: "35" }} htmlColor="blue" className="editPostIcon" /></div>



                        </div>
                    </div>
                    <div className='editPostButtonContainer'>
                        <button onClick={handleEditPost} className="editPostButton" >Đăng</button>
                    </div>
                </div> :
                    <EditPostSkeleton />
            }
        </div>
    );

}

export default EditPost;