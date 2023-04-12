import './album.css'

import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Album() {
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const [albums, setAlbums] = useState([]);
    const [open, setOpen] = useState(false);
    const [privacy, setPrivacy] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

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

    useEffect(() => {
        const fetchAlbum = () => {
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-album-by-userid/userId=" + userId;
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                console.log("RES ALBUM", response.data)
                setAlbums(response.data);


            }).catch((error) => console.log(error.message));
        }
        fetchAlbum();
    }, [userId, cookies]);


    return (
        <div className='album'>
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>

                        <Grid onClick={handleClickOpen} item>
                            <div className='photosIConAdd'><IoMdAdd /></div>
                            <div className='albumNameContainer'><span className='albumName'>Tạo Album</span></div>
                        </Grid>
                        {albums.map((album) => (
                            <Grid key={album.id} item>
                                <img className='photosImageItem' src={album.thumnail} alt="" />
                                <div className='albumNameContainer'>
                                    <div className='albumInforAlbum'>
                                        <span className='albumName'>{album.album_name}</span>
                                        <span className='albumCount'>{album.totalImage + " ảnh"}</span>
                                    </div>
                                </div>
                            </Grid>
                        ))}

                    </Grid>


                </Grid>
            </Grid>
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
                                            <input placeholder='Tên album...' className='albumDialogInputAlbumName' type="text" />
                                        </div>
                                        <label htmlFor="albumDialogInputFiles" className='albumDialogInputFiles marginItem'>
                                            <input hidden id='albumDialogInputFiles' type="file" />
                                            <span >Tải ảnh lên</span>
                                        </label>
                                    </div>
                                    <div className='albumDialogLeftBottom '>
                                        <div className='albumDialogContainerSubmit marginItem'>
                                            <button className='albumDialogButtonSubmit '>
                                                Đăng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='albumDialogRight'>
                                    <div className='albumDialogRightDescriptionContainer'>
                                        <span className='albumDialogRigthDescription'>Bạn đã sẵn sàng thêm gì đó chưa?</span>
                                    </div>

                                </div>
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