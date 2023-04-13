import Grid from '@mui/material/Grid';
import { IoMdAdd } from 'react-icons/io'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';

import axios from "axios";

function ViewImageInAlbum() {
    const albumId = useParams().albumId;
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user')).id;
    const [albumName, setAlbumName] = useState('');
    const [images, setImages] = useState([]);

    const [open, setOpen] = useState(false);
    const [privacy, setPrivacy] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [files, setFiles] = useState([]);
    const [view, setView] = useState(false);
    const [lstImage, setLstImage] = useState([]);
    const [album, setAlbum] = useState('');

    const handleClickOpen = () => {
        setOpen(true);


    };
    const handleClose = () => {
        setOpen(false);
    };
    const hanldeSelectPrivacy = (privacy) => {
        setPrivacy(privacy);
        setAnchorEl(null);
    }

    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleChangeFiles = (event) => {
        if (event.target.files) {
            const selectedFIles = [];
            const targetFiles = event.target.files;
            const targetFilesObject = [...targetFiles]
            targetFilesObject.map((file) => {
                return selectedFIles.push(URL.createObjectURL(file))
            })
            setFiles(event.target.files);
            setLstImage(selectedFIles);
            setView(true)
        }
    }

    const handleChangeAlbumName = (e) => {
        setAlbum(e.target.value)

    }

    const handleSumbitEditAlbum = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/edit-album';
        axios({
            method: 'POST',
            url: requestURL,
            data: { albumId: albumId, albumName: album, privacy: privacy, files: files },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log("RES IMAGES IN ALBUM", response.data)
            setAlbumName(response.data.album_name);
            setImages(response.data.media_files);
            setLstImage([]);
            setOpen(false);

        }).catch((error) => console.log(error.message));
    }
    useEffect(() => {
        const fetchImageAlbum = () => {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-image-album/' + userId + '/' + albumId;
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                console.log("RES IMAGES IN ALBUM", response.data)
                setAlbumName(response.data.album_name);
                setAlbum(response.data.album_name);
                setImages(response.data.media_files);


            }).catch((error) => console.log(error.message));
        }
        fetchImageAlbum()
    }, [albumId, cookies])

    return (
        <div className="imageAlbum">
            <div className='imageAlbumNameContainer'>
                <span className='imageAlbumName'>{albumName}</span>
                <div onClick={handleClickOpen} className='imageAlbumEdit'>
                    Chỉnh sửa
                </div>
            </div>
            <div className='imageAlbumGrid'>
                <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="left" spacing={1}>
                            {
                                user.toString() === userId ? <Grid item>
                                    <div className='imageAlbumAdd'>
                                        <IoMdAdd />
                                        <div className='albumNameContainer'><span className='albumName'>Thêm ảnh</span></div>
                                    </div>
                                </Grid> : <></>
                            }
                            {images.map((image) => (
                                <Grid key={image.id} item>
                                    <img className='photosImageItem' src={image.media_file_name} alt="" />
                                </Grid>

                            ))}
                        </Grid>


                    </Grid>
                </Grid>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sx"
                >
                    <div className='albumDialog'>
                        <div className='albumHeaderDialogTitle'>Tạo Album</div>

                        <hr className='albumDialogHr' />
                        <div className='albumDialogWraaper'>
                            <div className='albumDialogContainer'>
                                <div className='albumDialogLeft'>
                                    <div className='albumDialogLeftTop'>
                                        <div className='albumDialogContainerPrivacy marginItem'>
                                            <div onClick={handleClickOpenMenu} className='albumPrivacy'>
                                                {privacy === 2 ? <PeopleAltIcon /> : privacy === 0 ? <LockPersonIcon /> : <PublicIcon />}
                                                <span>{privacy === 2 ? 'Bạn bè' : privacy === 0 ? 'Chỉ mình tôi' : 'Công khai'}</span>
                                                <ArrowDropDownIcon />
                                            </div>
                                        </div>
                                        <div className='albumDialogContainerAlbumName marginItem'>
                                            <input placeholder='Tên album...' className='albumDialogInputAlbumName' value={album} onChange={handleChangeAlbumName} type="text" />
                                        </div>
                                        <label onChange={handleChangeFiles} htmlFor="albumDialogInputFiles" className='albumDialogInputFiles marginItem'>
                                            <input multiple hidden id='albumDialogInputFiles' type="file" />
                                            <span >Tải ảnh lên</span>
                                        </label>
                                        <div className='albumDialogContainerSubmit marginItem'>
                                            <button className='albumDialogButtonDelete'>
                                                Xóa Album
                                            </button>
                                        </div>
                                    </div>
                                    <div className='albumDialogLeftBottom '>
                                        <div className='albumDialogContainerSubmit marginItem'>
                                            <button onClick={handleSumbitEditAlbum} className='albumDialogButtonSubmit '>
                                                Đăng
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {
                                    view ?
                                        <div className='albumDialogPreview'>
                                            <div className='albumDialogPreviewContainer'>
                                                <Grid sx={{ flexGrow: 1 }} container spacing={1.2}>
                                                    <Grid item xs={12}>
                                                        <Grid container justifyContent="left" spacing={1}>
                                                            {lstImage.map((item, index) => (
                                                                <Grid key={index} item>
                                                                    <img className='albumDialogPreviewItem' src={item} alt="" />
                                                                </Grid>

                                                            ))}
                                                        </Grid>


                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                        :
                                        <div className='albumDialogRight'>
                                            <div className='albumDialogRightDescriptionContainer'>
                                                <span className='albumDialogRigthDescription'>Bạn đã sẵn sàng thêm gì đó chưa?</span>
                                            </div>
                                        </div>
                                }


                            </div>
                        </div>
                        <div>
                            <div>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openMenu}
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
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}

export default ViewImageInAlbum;