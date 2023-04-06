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
    const [isUpload, setIsUpload] = useState(true);
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-image-uploaded/userId=' + userId;
        axios({
            method: 'GET', //you can set what request you want to be
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log("RES =========", response.data);
            setImgUploaded(response.data);
        }).catch((error) => console.log(error.message));

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
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                                <Grid key={value} item>
                                                    <img className='updateAvatarImageItem' src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/87857085_844273819374433_4021419020736528384_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=t5JmVLMCzkEAX8rgSs8&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfAe8QAb5ZDvCPdDV7WYJyjOfQK00MgZiFU-8OZhBOyNQg&oe=6451D36C" alt="" />
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