import './friends.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardUser from '../carduser/CardUser';
import { Users } from "../../data";

function Friends() {
    return (
        <div className='friends'>
            <div className="titleAndViewMore">
                <div>
                    <h2>Lời mời kết bạn</h2>
                </div>
                <div><h5 className='viewMore'>Xem tất cả </h5></div>
            </div>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    {Users.map((u) => (
                        <Grid item xs={2}>
                            <CardUser key={u.id} user={u} />
                        </Grid>
                    ))}
                </Grid>
            </Box>



        </div>
    );
}

export default Friends;
