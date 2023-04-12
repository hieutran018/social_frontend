import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewImageInAlbum() {
    const albumId = useParams().albumId;
    const cookies = useCookies('_tk')[0]._tk;
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImageAlbum = () => {
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-image-album/' + albumId;
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                console.log("RES IMAGES IN ALBUM", response.data)
                setImages(response.data);


            }).catch((error) => console.log(error.message));
        }
        fetchImageAlbum()
    })

    return (
        <div className="imageAlbum">
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>
                        {images.map((image) => (
                            <Grid key={image.id} item>
                                <img className='photosImageItem' src={image.media_file_name} alt="" />
                            </Grid>

                        ))}
                    </Grid>


                </Grid>
            </Grid>
        </div>
    );
}

export default ViewImageInAlbum;