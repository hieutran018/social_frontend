import '../rightbar.css';
import Grid from '@mui/material/Grid';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { baseURL } from '../../auth/auth';

function RightbarProfile({ user }) {
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const [photoBy, setPhotoBy] = useState([]);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const fetchListFriendById = () => {
            // const requestURL = "https://ckcsocial.site/api/v1/fetch-friend-by-user-id/" + userId + "/6";
            baseURL.get('/api/v1/fetch-friend-by-user-id/ ' + userId + '/6', {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                setFriends(response.data);
            }).catch((error) => console.log(error.message));
        }

        const fetchImageById = () => {
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-image-uploaded/userId=' + userId + '/6';
            baseURL.get('/api/v1/fetch-image-uploaded/userId=' + userId + '/6', {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("RES PHOTO =========", response.data);
                setPhotoBy(response.data);
            }).catch((error) => console.log(error));
        }
        fetchListFriendById();
        fetchImageById();

    }, [userId, cookies])

    return (
        <div>
            <div className="rightbarContainer">
                <div className="rightbarInfo">
                    <div className="rightbarInfoContent">
                        <h4 className="rightbarTitle">Giới thiệu</h4>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Sống tại:</span>
                            <span className="rightbarInfoValue">{user ? (user.live_in ? user.live_in : " Chưa cập nhật") : "Đang tải..."}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Đến từ:</span>
                            <span className="rightbarInfoValue">{user ? (user.went_to ? user.went_to : " Chưa cập nhật") : "Đang tải..."}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Mối quan hệ: </span>
                            <span className="rightbarInfoValue">{user ? (parseInt(user.relationship) === 0 ? 'Độc thân' : parseInt(user.relationship) === 1 ? 'Hẹn hò' : parseInt(user.relationship) === 2 ? 'Kết hôn' : "Chưa cập nhật") : "Đang tải..."}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightbarMargin"></div>
            <div className="rightbarContainer">
                <div className="rightbarFriend">
                    <div className="rightbarFriendContent">
                        <div className="rightbarTitleContent"><h4 className="rightbarTitle">Bạn bè</h4><Link className="rightbarLinkViewMoreFriend" to={"/userId/" + userId + "/friends"}><span className="rightbarLinkViewMoreFriend">Xem tất cả bạn bè</span></Link></div>
                        <div className="rightbarFriendContainer">
                            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="left" spacing={0.5}>
                                        {friends.map((item) => (
                                            <Grid key={item.id} item>
                                                <div className="rightbarFollowing">
                                                    <div className="rightbarContainerImgUser">
                                                        <img
                                                            src={item.avatar}
                                                            alt=""
                                                            className="rightbarFollowingImg"
                                                        />
                                                    </div>
                                                    <span className="rightbarFollowingName">{item.displayName}</span>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightbarMargin"></div>
            <div className="rightbarContainer">
                <div className="rightbarFriend">
                    <div className="rightbarFriendContent">
                        <div className="rightbarTitleContent"><h4 className="rightbarTitle">Ảnh</h4><Link className="rightbarLinkViewMoreFriend" to={"/userId/" + userId + "/photos/photos_of"}><span>Xem tất cả ảnh</span></Link></div>
                        <div className="rightbarFriendContainer">
                            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="left" spacing={0.5}>
                                        {photoBy.map((item) => (
                                            <Grid key={item.id} item>
                                                <img className='rightbarImage' src={item.media_file_name} alt="" />
                                            </Grid>

                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightbarProfile