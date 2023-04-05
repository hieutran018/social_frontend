import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';

function PhotoBy() {
    const userId = useParams();
    const cookies = useCookies('_tk')[0]._tk;
    const [photoBy, setPhotoBy] = useState([]);
    useEffect(() => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-image-uploaded/userId=' + userId.userId;
        axios({
            method: 'GET', //you can set what request you want to be
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log("RES =========", response.data);
            setPhotoBy(response.data);
        }).catch((error) => console.log(error.message));

    }, [cookies, userId.userId])

    return (
        <div className="photoBy">
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>
                        {photoBy.map((item) => (
                            <Grid key={item.id} item>
                                <img className='photosImageItem' src={item.media_file_name} alt="" />
                            </Grid>

                        ))}
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}

export default PhotoBy;