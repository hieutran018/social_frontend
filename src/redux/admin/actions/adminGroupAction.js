import {
    ADMIN_FETCH_GROUP_STARTED,
    ADMIN_FETCH_GROUP_SUCCESSED,
    ADMIN_FETCH_GROUP_FAILURED
} from '../constants/adminGroupConstant';
import axios from 'axios';

export const adminFetchGroupStarted = () => ({
    type: ADMIN_FETCH_GROUP_STARTED
})

export const adminFetchGroupSuccessed = groups => ({
    type: ADMIN_FETCH_GROUP_SUCCESSED,
    groups
})

export const adminFetchGroupFailured = errors => ({
    type: ADMIN_FETCH_GROUP_FAILURED,
    errors
})

export const fetchGroups = (cookies) => {
    return async dispatch => {
        dispatch(adminFetchGroupStarted())
        try {

            const requestURL = "http://127.0.0.1:8000/api/v1/admin/fetch-list-group";
            axios({
                method: 'GET',
                url: requestURL,

                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {
                dispatch(adminFetchGroupSuccessed(response.data));
            }).catch((error) => dispatch(adminFetchGroupFailured(error.message)));
        } catch (error) {
            dispatch(adminFetchGroupFailured(error))
        }
    }
}