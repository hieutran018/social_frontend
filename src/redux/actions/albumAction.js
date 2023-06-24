import {
    FETCH_ALBUM_STARTED,
    FETCH_ALBUM_SUCCEEDED,
    FETCH_ALBUM_FAILED, CREATE_ALBUM
} from '../constants/albumConstant';
import axios from 'axios';


export const fetchAlbumStarted = () => ({
    type: FETCH_ALBUM_STARTED
})
export const fetchAlbumSucceeded = albums => ({
    type: FETCH_ALBUM_SUCCEEDED,
    albums
})
export const fetchAlbumFailed = error => ({
    type: FETCH_ALBUM_FAILED,
    error
})
export const createAlbum = album => ({
    type: CREATE_ALBUM,
    album
})


export const fetchAlbum = (cookies, userId) => {
    return async dispatch => {
        dispatch(fetchAlbumStarted())

        try {

            const requestURL = "https://ckcsocial.site/api/v1/fetch-album-by-userid/userId=" + userId;
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
                dispatch(fetchAlbumSucceeded(response.data));


            }).catch((error) => dispatch(fetchAlbumFailed(error.message)));
        } catch (err) {
            dispatch(fetchAlbumFailed(err))
        }
    }
}

export const createNewAlbum = (cookies, albumName, privacy, files) => {
    return async dispatch => {
        try {

            const requestURL = 'https://ckcsocial.site/api/v1/create-album';
            axios({
                method: 'POST',
                url: requestURL,
                data: { albumName: albumName, privacy: privacy, files: files },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                dispatch(createAlbum(response.data));
                console.log(response.data);

            }).catch((error) => console.log(error));
        } catch (err) {

        }
    }
}



