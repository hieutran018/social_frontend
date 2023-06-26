import { baseURL } from '../../components/auth/auth';
import {
    FETCH_MEDIAFILE_STARTED,
    FETCH_MEDIAFILE_SUCCEEDED,
    FETCH_MEDIAFILE_FAILED
} from '../constants/mediafileConstant';


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
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-image-uploaded/userId=' + userId;
            baseURL.get('/api/v1/fetch-image-uploaded/userId=' + userId, {
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

export const fetchMediaFilePostTag = (cookies, userId) => {
    return async dispatch => {
        try {
            dispatch(fetchMediaFileStarted());
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-image-from-post-tag/userId=' + userId;
            baseURL.get('/api/v1/fetch-image-from-post-tag/userId=' + userId, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("MEDIAFILE POST TAG", response.data);
                dispatch(fetchMediaFileSucceeded(response.data));
            }).catch((error) => dispatch(fetchMediaFileFailed(error.message)));
        } catch (error) {
            dispatch(fetchMediaFileFailed(error));
        }
    }
}

