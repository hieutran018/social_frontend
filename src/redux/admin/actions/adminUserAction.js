import {
    ADMIN_FETCH_USER_STARTED,
    ADMIN_FETCH_USER_SUCCESSED,
    ADMIN_FETCH_USER_FAILURED
} from '../constants/adminUserConstant';
import axios from 'axios';

export const adminFetchUserStarted = () => ({
    type: ADMIN_FETCH_USER_STARTED
})

export const adminFetchUserSuccessed = users => ({
    type: ADMIN_FETCH_USER_SUCCESSED,
    users
})

export const adminFetchUserFailured = errors => ({
    type: ADMIN_FETCH_USER_FAILURED,
    errors
})

export const fetchUsers = (cookies) => {
    return async dispatch => {
        dispatch(adminFetchUserStarted())
        try {

            const requestURL = "http://127.0.0.1:8000/api/v1/admin/fetch-list-user";
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                dispatch(adminFetchUserSuccessed(response.data));
            }).catch((error) => dispatch(adminFetchUserFailured(error.message)));
        } catch (error) {
            dispatch(adminFetchUserFailured(error))
        }
    }
}