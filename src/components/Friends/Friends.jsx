import './friends.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardUser from '../carduser/CardUser';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { baseURL } from '../auth/auth';


function Friends() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [frs, setFrs] = useState([]);
    const cookies = useCookies('_tk')[0]._tk;
    useEffect(() => {
        const fetchFriendSuggestion = () => {
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-friend-request-list';
            baseURL.get('/api/v1/fetch-friend-request-list/userId=' + user.id, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("RES =========", response.data);
                setFrs(response.data);
            }).catch((error) => console.log(error.message));
        }
        fetchFriendSuggestion()
    }, [user.id, cookies])

    return (
        <div className='friends'>
            <div className='friendsContainer'>
                <div className="titleAndViewMore">
                    <div>
                        <h2>Lời mời kết bạn ({frs.length})</h2>
                    </div>
                    <div><Link to='/friend-request'><h5 className='viewMore'>Xem tất cả </h5></Link></div>
                </div>
                <div className="friendMain" >
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1.8} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            {frs.map((u, i) => (
                                <Grid key={i} item md={2}>
                                    <CardUser key={u.id} user={u} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>

            </div>


        </div>
    );
}

export default Friends;
