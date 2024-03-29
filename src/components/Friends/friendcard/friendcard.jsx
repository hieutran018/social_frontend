import '../friends.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { baseURL } from '../../auth/auth';
function FriendCard({ friend }) {
    const userCurrent = useParams().userId;
    const user = JSON.parse(localStorage.getItem('user'));
    const cookies = useCookies('_tk')[0]._tk;
    const [isFriend, setIsFriend] = useState(true)
    const [isSend, setIsSend] = useState(true);
    console.log(user.id === userCurrent, user.id, userCurrent);
    const unFriend = (userId) => {
        // const requestURL = 'https://ckcsocial.site/api/v1/unfriend';
        baseURL.post('/api/v1/unfriend', {
            userId: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setIsFriend(false);
        }).catch((error) => console.log(error.message));


    }

    const hanldeClickResendAddFriend = (userId) => {
        // const requestURL = "https://ckcsocial.site/api/v1/request-add-friend";
        baseURL.post('/api/v1/request-add-friend', {
            userIdAccept: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setIsSend(false);
        }).catch((error) => console.log(error.message));
    }

    const hanldeClickCancelAddFriend = (userId) => {
        // const requestURL = "https://ckcsocial.site/api/v1/cancle-add-friend";
        baseURL.post('/api/v1/cancle-add-friend', {
            userId: userId
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            setIsSend(true);
        }).catch((error) => console.log(error.message));
    }
    return (
        <div className='friendCard'>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,

                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <img className='friendCardUserAvatar' src={friend.avatar} alt="" />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <div className='friendCardRight'>
                                <div className='friendCardRightContainer'>
                                    <Link className='friendCardUserName' to={"/userId/" + friend.friendId}>
                                        <div>
                                            <span className='friendCardUserName'>{friend.displayName}</span>
                                        </div>
                                    </Link>
                                    <div>
                                        <div className='informationButtonEdit'><MoreHorizIcon /></div>
                                    </div>
                                </div>
                                {
                                    user.id.toString() === userCurrent ?
                                        <div className='friendCardButtonUnfriend' >
                                            {
                                                isFriend ? <button onClick={() => unFriend(friend.friendId)} className='friendButtonUnFriend'>Hủy kết bạn</button>
                                                    : (isSend ? <button onClick={() => hanldeClickResendAddFriend(friend.friendId)} className='friendButtonResendAddFriend'>Kết bạn</button> : <button onClick={() => hanldeClickCancelAddFriend(friend.friendId)} className='friendButtonUnFriend'>Hủy lời mời</button>)
                                            }
                                        </div> :
                                        <></>
                                }

                            </div>

                        </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


export default FriendCard;