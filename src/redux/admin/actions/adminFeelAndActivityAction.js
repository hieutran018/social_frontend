import {
    ADMIN_FETCH_FAA_STARTED,
    ADMIN_FETCH_FAA_SUCCESSED,
    ADMIN_FETCH_FAA_FAILURED,
    ADMIN_CREATE_FAA
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
export const adminCreateFaAFailured = faa => ({
    type: ADMIN_CREATE_FAA,
    faa
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

export const addNewFeelAndActivity = (token, iconName, file) => {
    return async dispatch => {
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/admin/create-feel-and-activity";

            axios({
                method: 'POST',
                url: requestURL,
                data: { iconName: iconName, file: file },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log("CREATE FEEL AND ACTIVITY", response.data);
                dispatch(adminCreateFaAFailured(response.data));
            }).catch((error) => console.log(error));
        } catch (error) {
            dispatch(console.log(error))
        }
    }
}