import Grid from '@mui/material/Grid';
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './files.css';
import { baseURL } from "../../auth/auth";

function FileTab() {
    const groupId = useParams().groupId;
    const cookies = useCookies('_tk')[0]._tk;
    const [photos, setPhotos] = useState([]);
    const fetchGroupPhotoList = () => {
        // const requestURL = 'https://ckcsocial.site/api/v1/fetch-group-photo-list/groupId=' + groupId + '&limit';
        baseURL.get('/api/v1 / fetch - group - photo - list / groupId=' + groupId + ' & limit', {
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
        <div className="fileTab">
            <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={0.5}>
                        {photos.map((item) => (
                            <Grid key={item.id} item>
                                <img className='fileTabItemList' src={item.media_file_name} alt="" />
                            </Grid>

                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
export default FileTab;