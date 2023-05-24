import {
    ADMIN_FETCH_FAA_STARTED,
    ADMIN_FETCH_FAA_SUCCESSED,
    ADMIN_FETCH_FAA_FAILURED
} from '../../admin/constants/adminFeelAndActivityConstant';
import axios from 'axios';

export const adminFetchFaAStarted = () => ({
    type: ADMIN_FETCH_FAA_STARTED
})

export const adminFetchFaASuccessed = faas => ({
    type: ADMIN_FETCH_FAA_SUCCESSED,
    faas
})

export const adminFetchFaAFailured = errors => ({
    type: ADMIN_FETCH_FAA_FAILURED,
    errors
})

export const fetchFAAs = (cookies) => {
    return async dispatch => {
        dispatch(adminFetchFaAStarted())
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/admin/fetch-list-feel-and-activity";
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                dispatch(adminFetchFaASuccessed(response.data));
            }).catch((error) => dispatch(adminFetchFaAFailured(error.message)));
        } catch (error) {
            dispatch(adminFetchFaAFailured(error))
        }
    }
}