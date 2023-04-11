import './friendlist.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FriendCard from '../friendcard/friendcard';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';





function FriendList() {
    const { userId } = useParams();
    const [fr, setFr] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
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
            console.log("RES FRIEND", response.data)
            setFr(response.data);


        }).catch((error) => console.log(error.message));

    }, [userId, cookies])




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
                                        <FriendCard friend={u} />
                                    </Grid>
                                    : <div key={u.id}></div>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </div>

        </div>
    )
}

export default FriendList;