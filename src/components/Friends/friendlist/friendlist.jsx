import './friendlist.css'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';





function FriendList() {
    const { userId } = useParams();
    const [fr, setFr] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
    const [isFriend, setIsFriend] = useState(true);
    useEffect(() => {
        const requestURL = "http://127.0.0.1:8000/api/v1/fetch-friend-by-user-id/" + userId;

        axios({
            method: 'GET',
            url: requestURL,

            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log(response.data)
            setFr(response.data);


        }).catch((error) => console.log(error.message));

    }, [userId, cookies])

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
            console.log(response.data)

        }).catch((error) => console.log(error.message));
        console.log(fr);

    }


    return (
        <div className="friendList">
            <div className="friendListWrapper">
                <div className='friendHeader'>
                    <span className='friendTitleText'> Bạn bè</span>
                </div>
                <div className='friendMain'>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={3} columnSpacing={3}>
                            {fr.map((u) => (
                                u.status === 1 ?
                                    <Grid key={u.id} item xs={6}>
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
                                                        <img className='friendCardUserAvatar' src={u.avatar} alt="" />
                                                    </Grid>
                                                    <Grid item xs={12} sm container>
                                                        <Grid item xs container direction="column" spacing={2}>
                                                            <div className='friendCardRight'>
                                                                <div className='friendCardRightContainer'>
                                                                    <div>
                                                                        <span className='friendCardUserName'>{u.username}</span>
                                                                    </div>
                                                                    <div>
                                                                        <div className='informationButtonEdit'><MoreHorizIcon /></div>
                                                                    </div>
                                                                </div>
                                                                <div className='friendCardButtonUnfriend' >

                                                                    <button onClick={() => unFriend(u.friendId)} className='friendButtonUnFriend'>Hủy kết bạn</button>
                                                                </div>
                                                            </div>

                                                        </Grid>


                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </div>
                                    </Grid>
                                    : <div></div>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </div>

        </div>
    )
}

export default FriendList;