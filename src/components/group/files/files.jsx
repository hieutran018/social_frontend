import axios from "axios";
import Grid from '@mui/material/Grid';
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './files.css';

function FileList() {
    const groupId = useParams().groupId;
    const cookies = useCookies('_tk')[0]._tk;
    const [photos, setPhotos] = useState([]);
    const fetchGroupPhotoList = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-group-photo-list/groupId=' + groupId + '&limit=6';
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response => {
            console.log(response.data);
            setPhotos(response.data);
        })).catch((error) => console.log(error));
    }
    useEffect(() => {
        fetchGroupPhotoList();
    }, [])
    return (
        <div className="fileList">
            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={0.5}>
                        {photos.map((item) => (
                            <Grid key={item.id} item>
                                <img className='fileListItem' src={item.media_file_name} alt="" />
                            </Grid>

                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
export default FileList;