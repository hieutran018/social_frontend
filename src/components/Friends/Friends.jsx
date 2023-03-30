import './friends.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardUser from '../carduser/CardUser';
import { Users } from "../../data";

function Friends() {
    return (
        <div className='friends'>
            <div className='friendsContainer'>
                <div className="titleAndViewMore">
                    <div>
                        <h2>Lời mời kết bạn</h2>
                    </div>
                    <div><h5 className='viewMore'>Xem tất cả </h5></div>
                </div>
                <div className="friendMain" >
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1.8} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                            {Users.map((u, i) => (
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
