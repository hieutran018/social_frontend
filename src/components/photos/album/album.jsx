import './album.css'

import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Album() {
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const fetchAlbum = () => {
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-album-by-userid/userId=" + userId;
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                console.log("RES ALBUM", response.data)
                setAlbums(response.data);


            }).catch((error) => console.log(error.message));
        }
        fetchAlbum();
    }, [userId, cookies]);


    return (
        <div className='album'>
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>

                        <Grid item>
                            <div className='photosIConAdd'><IoMdAdd /></div>
                            <div className='albumNameContainer'><span className='albumName'>Tạo Album</span></div>
                        </Grid>
                        {albums.map((album) => (
                            <Grid key={album.id} item>
                                <img className='photosImageItem' src={album.thumnail} alt="" />
                                <div className='albumNameContainer'><span className='albumName'>{album.album_name}</span></div>
                            </Grid>
                        ))}

                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}

export default Album;