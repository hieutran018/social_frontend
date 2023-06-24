import './mygroup.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupCard from './groupcard/groupcard'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function MyGroup() {
    const cookies = useCookies('_tk')[0]._tk;
    const [groupInvites, setGroupInvites] = useState([]);

    useEffect(() => {
        function fetchRequestJoindGroup() {
            const requestURL = 'https://ckcsocial.site/api/v1/fetch-invite-to-group';

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
                setGroupInvites(response.data);



            }).catch((error) => console.log(error.message));

        }
        fetchRequestJoindGroup()
    }, [cookies])


    return (
        <div className='myGroup'>
            <div className='myGroupWrapper'>
                <div className='myGroupHaveRequest'>
                    <div className='myGroupaveRequesTitle'>Lời mời tham gia nhóm</div>
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                                {groupInvites.map((groupInvite) => (

                                    <Grid key={groupInvite.id} item xs={4}>
                                        <GroupCard group={groupInvite} />
                                    </Grid>

                                ))}
                            </Grid>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyGroup;