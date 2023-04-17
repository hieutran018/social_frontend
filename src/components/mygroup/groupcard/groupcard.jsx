import './groupcard.css';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function GroupCard({ group }) {
    const cookies = useCookies('_tk')[0]._tk;
    function acceptJoinGroup() {
        const requestURL = 'http://127.0.0.1:8000/api/v1/accept-invite-to-group';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                groupId: group.groupId
            },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }

        }).then((response) => {
            console.log(response.data);
        }).catch((error) => { console.log(error.message); });
    }
    return (
        <div className='groupCard'>
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
                        <img className='groupCardAvatarroup' src={group.avatarGroup} alt="" />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <div className='groupCardRight'>
                                <div className='groupCardRightContainer'>
                                    <Link className='groupCardUserName' to={"/groups/group/" + group.groupId}>
                                        <div>
                                            <span className='groupCardUserName'>{group.groupName}</span>
                                        </div>
                                    </Link>

                                </div>

                            </div>

                        </Grid>
                        <div className='groupCardButtonViewContainer' >
                            <button onClick={acceptJoinGroup} className='groupCardButtonAccept'>Tham gia</button>
                            <button className='groupCardButtonCancel'>Từ chối</button>

                        </div>

                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default GroupCard;