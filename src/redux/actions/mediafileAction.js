import {
    FETCH_MEDIAFILE_STARTED,
    FETCH_MEDIAFILE_SUCCEEDED,
    FETCH_MEDIAFILE_FAILED
} from '../constants/mediafileConstant';
import axios from 'axios';


export const fetchMediaFileStarted = () => ({
    type: FETCH_MEDIAFILE_STARTED
})

export const fetchMediaFileSucceeded = mediafiles => ({
    type: FETCH_MEDIAFILE_SUCCEEDED,
    mediafiles
})

export const fetchMediaFileFailed = error => ({
    type: FETCH_MEDIAFILE_FAILED,
    error
})

export const fetchMediaFile = (cookies, userId) => {
    return async dispatch => {
        try {
            dispatch(fetchMediaFileStarted());
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-image-uploaded/userId=' + userId;
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
                dispatch(fetchMediaFileSucceeded(response.data));
            }).catch((error) => dispatch(fetchMediaFileFailed(error.message)));
        } catch (error) {
            dispatch(fetchMediaFileFailed(error));
        }
    }
}

