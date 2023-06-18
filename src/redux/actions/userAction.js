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
    UPDATE_COVER_FAILED,
    FETCH_CURRENT_USER
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
export const fetchCurrentUser = user => ({
    type: FETCH_CURRENT_USER,
    user
})

export const fetchUser = (cookies, userId) => {
    return async dispatch => {

        const requestURL = "http://127.0.0.1:8000/api/v1/profile-user/userId=" + userId;
        dispatch(fetchUserStart());
        axios({
            method: 'GET',
            url: requestURL,
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        }).then((response) => {
            dispatch(fetchUserSuccessed(response.data))
            console.log(response.data);
        }).catch((error) => dispatch(fetchUserFail(error.message)));
    }
}

export const currentUser = (cookies) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/auth/me';
            axios({
                method: "POST",
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchCurrentUser(response.data))
            })
        } catch (error) {

        }
    }
}

export const updateDisplaynameUser = (cookies, displayName) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/update-displayname-user';
            axios({
                method: "POST",
                url: requestURL,
                data: {
                    displayName: displayName
                },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchCurrentUser(response.data));
                localStorage.setItem('user', JSON.stringify(response.data))
            })
        } catch (error) {

        }
    }
}
export const updatePhoneUser = (cookies, phone) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/update-phone-user';
            axios({
                method: "POST",
                url: requestURL,
                data: {
                    phone: phone
                },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(fetchCurrentUser(response.data));
                localStorage.setItem('user', JSON.stringify(response.data))
            })
        } catch (error) {

        }
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
        }).then(res => { console.log(res.data); dispatch(fetchUser(cookies, res.data.id)); dispatch(updateCoverUserSuccess(res.data)); localStorage.setItem('user', JSON.stringify(res.data)) }).catch(err => dispatch(updateCoverUserFail(err.message)));
    }
}