import {
    ADMIN_FETCH_POST_STARTED,
    ADMIN_FETCH_POST_SUCCESSED,
    ADMIN_FETCH_POST_FAILURED
} from '../constants/adminPostConstant';
import axios from 'axios';

export const adminFetchPostStarted = () => ({
    type: ADMIN_FETCH_POST_STARTED
})

export const adminFetchPostSuccessed = posts => ({
    type: ADMIN_FETCH_POST_SUCCESSED,
    posts
})

export const adminFetchPostFailured = errors => ({
    type: ADMIN_FETCH_POST_FAILURED,
    errors
})

export const fetchPosts = (cookies) => {
    return async dispatch => {
        dispatch(adminFetchPostStarted())
        try {

            const requestURL = "http://127.0.0.1:8000/api/v1/admin/fetch-list-post";
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(adminFetchPostSuccessed(response.data));
                console.log(response.data);
            }).catch((error) => dispatch(adminFetchPostFailured(error.message)));
        } catch (error) {
            dispatch(adminFetchPostFailured(error))
        }
    }
}