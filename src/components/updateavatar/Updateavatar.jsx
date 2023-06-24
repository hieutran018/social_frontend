import { useEffect, useState } from 'react';
import './updateavatar.css'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/actions/userAction'

function UpdateAvatar() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [imgUploaded, setImgUploaded] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
    const [file, setFile] = useState([]);
    const [imageAvatar, setImageAvatar] = useState([]);
    const [isUpload, setIsUpload] = useState(true);
    useEffect(() => {
        function fetchImageAvatars() {
            const requestURL = 'https://ckcsocial.site/api/v1/fetch-image-avatar/userId=' + userId;
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                setImageAvatar(response.data);
            }).catch((error) => console.log(error));
        }
        function fetchImageUploaded() {
            const requestURL = 'https://ckcsocial.site/api/v1/fetch-image-uploaded/userId=' + userId;
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                setImgUploaded(response.data);
            }).catch((error) => console.log(error.message));
        }
        fetchImageUploaded();
        fetchImageAvatars();
    }, [cookies, userId])

    const hanldeChangeFileUpload = (e) => {
        console.log(e.target.files);
        setFile(e.target.files);
        setIsUpload(false);
    }

    const handleCancelChangeFile = () => {
        setFile([]);
        setIsUpload(true);
    }

    const handleSubmitUpload = () => {
        dispatch(updateAvatar(cookies, file))
        setFile([]);
        setIsUpload(true);
    }

    return (
        <div className="updateAvatar">
            <div className='updateAvatarTitleContainer'>
                <span className='updateAvatarTile'>Cập nhật ảnh đại diện</span>
            </div>
            <div className='updateAvatarHr'></div>
            <div className='updateAvatarWrapper'>
                {isUpload ?
                    <div style={{ width: '100%' }}>
                        <div className='updateAvatarUploadContainer'>
                            <input onChange={hanldeChangeFileUpload} id="updateAvatarUploadFile" type="file" hidden />
                            <label htmlFor='updateAvatarUploadFile' ><div className='updateAvatarUpload'>Tải ảnh lên</div></label>
                        </div>
                        <div className='updateAvatarUploadedContainer'>
                            <div className='updateAvatarUploaded'>
                                <span className='updateAvatarUploadeTitle'>Ảnh đã tải lên</span>
                            </div>
                            <div className='updateAvatarUploadedImage'>
                                <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="left" spacing={1}>
                                            {imgUploaded.map((item) => (
                                                <Grid key={item.id} item>
                                                    <img className='updateAvatarImageItem' src={item.media_file_name} alt="" />
                                                </Grid>

                                            ))}
                                        </Grid>


                                    </Grid>
                                </Grid>
                                <div className='updateAvatarUploadContainer'>
                                    <button className='updateAvatarViewMore'>Xem thêm</button>
                                </div>
                            </div>

                            <div className='updateAvatarUploaded'>
                                <span className='updateAvatarUploadeTitle'>Ảnh đại diện</span>
                            </div>
                            <div className='updateAvatarUploadedImage'>
                                <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="left" spacing={1}>
                                            {imageAvatar.map((item) => (
                                                <Grid key={item.id} item>
                                                    <img className='updateAvatarImageItem' src={item.media_file_name} alt="" />
                                                </Grid>

                                            ))}
                                        </Grid>


                                    </Grid>
                                </Grid>
                                <div className='updateAvatarUploadContainer'>
                                    <button className='updateAvatarViewMore'>Xem thêm</button>
                                </div>
                            </div>

                        </div>
                    </div> :
                    <div>
                        <div className='updateAvatarPreViewUpload'>
                            <img style={{ width: '350px', height: '350px' }} src={URL.createObjectURL(file[0])} alt="" />
                        </div>
                        <div className='updateAvatarButtonPreviewUpload'>
                            <button onClick={handleCancelChangeFile} className='updateAvatarButtonCancel'>Hủy</button>
                            <button onClick={handleSubmitUpload} className='updateAvatarButtonSave'>Lưu</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default UpdateAvatar;