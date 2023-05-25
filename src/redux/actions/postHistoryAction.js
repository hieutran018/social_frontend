import {
    FETCH_POSTHISTORY_STARTED,
    FETCH_POSTHISTORY_SUCCEEDED,
    FETCH_POSTHISTORY_FAILED
} from '../constants/postHistoryConstant';
import axios from 'axios';


export const fetchPostHistoryStarted = () => ({
    type: FETCH_POSTHISTORY_STARTED
})

export const fetchPostHistorySucceeded = histories => ({
    type: FETCH_POSTHISTORY_SUCCEEDED,
    histories
})

export const fetchPostHistoryFailed = errors => ({
    type: FETCH_POSTHISTORY_FAILED,
    errors
})

export const fetchPostHistory = (cookies, postId) => {
    return async dispatch => {
        dispatch(fetchPostHistoryStarted())
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/fetch-history-edit-post/postId=" + postId;
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("POST HISTORY", response.data)
                dispatch(fetchPostHistorySucceeded(response.data));
            }).catch((error) => dispatch(fetchPostHistoryFailed(error.message)));
        } catch (err) {
            dispatch(fetchPostHistoryFailed(err))
        }
    }
}