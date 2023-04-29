import './album.css'

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbum, createNewAlbum } from '../../../redux/actions/albumAction';
import { selectAlbum, selectStatusAlbum } from '../../../redux/selectors/albumSelector';
import ViewImageInAlbum from './viewalbum';
import SkeletonAlbum from './skeletonAlbum';



function Album() {
    const userId = useParams().userId;
    const albumId = useParams().albumId;
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user')).id;
    const [open, setOpen] = useState(false);
    const [privacy, setPrivacy] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [view, setView] = useState(false);
    const [albumName, setAlbumName] = useState('');
    const dispatch = useDispatch();
    const status = useSelector(selectStatusAlbum);
    const albums = useSelector(selectAlbum);
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
            setImages(selectedFIles);
            setView(true)
        }
    }

    const handleChangeAlbumName = (e) => {
        setAlbumName(e.target.value)

    }

    const handleSubmitCreateAlbum = () => {
        dispatch(createNewAlbum(cookies, albumName, privacy, files));
        setOpen(false);
    }





    useEffect(() => {
        dispatch(fetchAlbum(cookies, userId))
    }, [userId, cookies, dispatch]);

    return (
        <div className='album'>
            {
                !albumId ?
                    <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="left" spacing={1}>
                                {
                                    user.toString() === userId ? <Grid onClick={handleClickOpen} item>
                                        <div className='photosIConAdd'><IoMdAdd /></div>
                                        <div className='albumNameContainer'><span className='albumName'>Tạo Album</span></div>
                                    </Grid> : <></>
                                }

                                {
                                    status === 'loading' ? <SkeletonAlbum /> : status === 'succeeded' ?
                                        albums.map((album) => (
                                            <Grid key={album.id} item>

                                                <Link to={"/userId/" + userId + "/photos/album/" + album.id}>
                                                    {album.thumnail === null ? <div style={{
                                                        backgroundColor: "#D8DADF", width: "11.95rem",
                                                        height: "11.95rem"
                                                    }}></div> : <img className='photosImageItem' src={album.thumnail} alt="" />}
                                                </Link>

                                                <div className='albumNameContainer'>
                                                    <div className='albumInforAlbum'>
                                                        <span className='albumName'>{album.album_name}</span>
                                                        <span className='albumCount'>{album.totalImage + " ảnh"}</span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        ))
                                        : <SkeletonAlbum />
                                }
                            </Grid>
                        </Grid>
                    </Grid> : <ViewImageInAlbum />
            }
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
                                            <input placeholder='Tên album...' className='albumDialogInputAlbumName' onChange={handleChangeAlbumName} type="text" />
                                        </div>
                                        <label onChange={handleChangeFiles} htmlFor="albumDialogInputFiles" className='albumDialogInputFiles marginItem'>
                                            <input multiple hidden id='albumDialogInputFiles' type="file" />
                                            <span >Tải ảnh lên</span>
                                        </label>
                                    </div>
                                    <div className='albumDialogLeftBottom '>
                                        <div className='albumDialogContainerSubmit marginItem'>
                                            <button onClick={handleSubmitCreateAlbum} className='albumDialogButtonSubmit '>
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
                                                            {images.map((item, index) => (
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
    )
}

export default Album;