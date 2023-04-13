import '../friends.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { Link } from 'react-router-dom'
function FriendCard({ friend }) {

    const cookies = useCookies('_tk')[0]._tk;
    const [isFriend, setIsFriend] = useState(true)
    const [isSend, setIsSend] = useState(true);
    const unFriend = (userId) => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/unfriend';
        axios({
            method: 'POST',
            url: requestURL,
            data: { userId: userId },
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
        const requestURL = "http://127.0.0.1:8000/api/v1/request-add-friend";

        axios({
            method: 'POST',
            url: requestURL,
            data: { userIdAccept: userId },
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
        const requestURL = "http://127.0.0.1:8000/api/v1/cancle-add-friend";

        axios({
            method: 'POST',
            url: requestURL,
            data: { userIdAccept: userId },
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
    console.log(friend)
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
                                    <Link className='friendCardUserName' to={"/" + friend.friendId}>
                                        <div>
                                            <span className='friendCardUserName'>{friend.username}</span>
                                        </div>
                                    </Link>
                                    <div>
                                        <div className='informationButtonEdit'><MoreHorizIcon /></div>
                                    </div>
                                </div>
                                <div className='friendCardButtonUnfriend' >
                                    {
                                        isFriend ? <button onClick={() => unFriend(friend.friendId)} className='friendButtonUnFriend'>Hủy kết bạn</button>
                                            : (isSend ? <button onClick={() => hanldeClickResendAddFriend(friend.friendId)} className='friendButtonResendAddFriend'>Kết bạn</button> : <button onClick={() => hanldeClickCancelAddFriend(friend.friendId)} className='friendButtonUnFriend'>Hủy lời mời</button>)
                                    }

                                </div>
                            </div>

                        </Grid>


                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


export default FriendCard;