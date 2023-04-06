import axios from "axios";


import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESSED,
    FETCH_USER_FAILED,
    UPDATE_USER_STARTED,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESSED,
    UPDATE_AVATAR_STARTED,
    UPDATE_AVATAR_SUCCESSED,
    UPDATE_AVATAR_FAILED,
    UPDATE_COVER_STARTED,
    UPDATE_COVER_SUCCESSED,
    UPDATE_COVER_FAILED
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

export const updateAvatarUserStart = () => ({
    type: UPDATE_AVATAR_STARTED,
})

export const updateAvatarUserSuccess = users => ({
    type: UPDATE_AVATAR_SUCCESSED,
    users
})
export const updateAvatarUserFail = error => ({
    type: UPDATE_AVATAR_FAILED,
    error
})

export const updateCoverUserStart = () => ({
    type: UPDATE_COVER_STARTED,
})

export const updateCoverUserSuccess = users => ({
    type: UPDATE_COVER_SUCCESSED,
    users
})
export const updateCoverUserFail = error => ({
    type: UPDATE_COVER_FAILED,
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
        dispatch(updateAvatarUserStart());
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

export const updateAvatar = (cokkie, file) => {
    return async dispatch => {
        dispatch(updateAvatarUserStart());
        const requestURL = 'http://127.0.0.1:8000/api/v1/upload-avatar';

        axios({
            method: 'POST',
            url: requestURL,
            data: { file: file },
            headers: {
                Authorization: 'Bearer ' + cokkie,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => { console.log(res.data); dispatch(updateAvatarUserSuccess(res.data)); localStorage.setItem('user', JSON.stringify(res.data)) }).catch(err => dispatch(updateAvatarUserFail(err.message)));
    }
}

export const updateCoverImage = (cookies, file) => {
    return async dispatch => {
        dispatch(updateCoverUserStart());
        const requestURL = 'http://127.0.0.1:8000/api/v1/upload-cover-image';

        axios({
            method: 'POST',
            url: requestURL,
            data: { file: file },
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => { console.log(res.data); dispatch(fetchUser(res.data.id)); dispatch(updateCoverUserSuccess(res.data)); localStorage.setItem('user', JSON.stringify(res.data)) }).catch(err => dispatch(updateCoverUserFail(err.message)));
    }
}