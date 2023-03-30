import './dialogshare.css'
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { addNewPost } from '../../redux/actions/postAction'

function DialogShare() {
    const cookies = useCookies('_tk');
    const [anchorEl, setAnchorEl] = useState(null);
    const [privacy, setPrivacy] = useState(2);
    const [view, setView] = useState(false);
    const open = Boolean(anchorEl);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();

    const [inputContentPost, setInputContentPost] = useState('');
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
    console.log(files)

    const submitPost = () => {
        if (inputContentPost === '' && files == null) {
            console.log("======= NO FILE =======")
            return;
        }



        dispatch(addNewPost(cookies[0]._tk, inputContentPost, files));
        console.log(inputContentPost);
        setInputContentPost('');

    }

    return (
        <div>
            <div className="wrapper">

                <div className='contaierHeader'>
                    <span className='shareTitle'>Tạo bài viết</span>
                </div>

                <div className="content">
                    <div className='shareImgAvatarContainer'><img className='shareImgAvatar' src="assets/person/1.jpeg" alt="logo" /></div>
                    <div className="details">
                        <p className='shareUserName'>Trần Dương Chí Hiếu</p>
                        <div className='privacy' onClick={handleClick}>
                            <div className='shareShowPrivacy'>
                                {privacy === 0 ? <PeopleAltIcon /> : privacy === 1 ? <LockPersonIcon /> : <PublicIcon />}
                                <span className='shareShowPrivacyText'>{privacy === 0 ? 'Bạn bè' : privacy === 1 ? 'Chỉ mình tôi' : 'Công khai'}</span>
                                <ArrowDropDownIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <textarea aria-multiline onChange={handleChangeContent} className='shareContentPost' placeholder="Bạn đang nghĩ gì thế?"></textarea>
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
                    <div><p className='shareDescrion'>Thêm vào bài viết của bạn</p></div>
                    <div className="options">

                        <label htmlFor='uploadFiles' onChange={handleFileChange}><input type="file" multiple id="uploadFiles" hidden /><PermMedia style={{ fontSize: "40" }} htmlColor="tomato" className="shareIcon" /></label>


                        <div><Room style={{ fontSize: "40" }} htmlColor="green" className="shareIcon" /></div>


                        <div><EmojiEmotions style={{ fontSize: "40" }} htmlColor="goldenrod" className="shareIcon" /></div>


                    </div>
                </div>
                <div className='shareButtonContainer'>
                    <button onClick={submitPost} className="shareButton">Đăng</button>
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
                        <MenuItem onClick={() => hanldeSelectPrivacy(2)} >Công khai</MenuItem>
                        <MenuItem onClick={() => hanldeSelectPrivacy(0)} >Bạn bè</MenuItem>
                        <MenuItem onClick={() => hanldeSelectPrivacy(1)}>Chỉ mình tôi</MenuItem>
                    </Menu>

                </div>

            </div>

        </div >
    );
}


export default DialogShare;