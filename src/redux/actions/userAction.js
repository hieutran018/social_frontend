import axios from "axios";


import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESSED,
    FETCH_USER_FAILED,
    UPDATE_USER_STARTED,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESSED
} from '../constants/userContant';

export const fetchUserStart = () => ({
    type: FETCH_USER_STARTED
})

export const fetchUserSuccessed = users => ({
    type: FETCH_USER_SUCCESSED,
    users
})

export const fetchUserFail = error => ({
    type: FETCH_USER_FAILED,
    error
})

export const updateUserStart = () => ({
    type: UPDATE_USER_STARTED,
})

export const updateUserSuccess = users => ({
    type: UPDATE_USER_SUCCESSED,
    users
})
export const updateUserFail = error => ({
    type: UPDATE_USER_FAILED,
    error
})

export const fetchUser = (userId) => {
    return async dispatch => {

        const requestURL = "http://127.0.0.1:8000/api/profile-user";
        dispatch(fetchUserStart());
        axios({
            method: 'POST',
            url: requestURL,
            data: { userId: userId }

        }).then((response) => {
            dispatch(fetchUserSuccessed(response.data))
        }).catch((error) => dispatch(fetchUserFail(error.message)));
        console.log(userId);
    }
}

export const updateUser = (cookies, wentTo, liveIn, relationship, phone) => {
    return async dispatch => {
        const requestURL = "http://127.0.0.1:8000/api/v1/edit-information-user";
        dispatch(updateUserStart());
        axios({
            method: 'POST', //you can set what request you want to be
            url: requestURL,
            data: { wentTo: wentTo, liveIn: liveIn, relationship: relationship, phone: phone },
            headers: {
                Authorization: 'Bearer ' + cookies[0]._tk,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log("RES =========", response.data);
            dispatch(updateUserSuccess(response.data));
            // dispatch(fetchUser())

        }).catch((error) => dispatch(updateUserFail(error.message)));
    }
}