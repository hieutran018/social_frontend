import './friendlist.css'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';





function FriendList() {
    const { userId } = useParams();
    const [fr, setFr] = useState([]);
    useEffect(() => {
        const requestURL = "http://127.0.0.1:8000/api/fetch-friend-by-user-id";
        console.log(userId);
        axios({
            method: 'POST',
            url: requestURL,
            data: { userId: userId },
            headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log(response.data)
            setFr(response.data)
            console.log(fr)

        }).catch((error) => console.log(error.message));
        console.log(fr);
    }, [userId])


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