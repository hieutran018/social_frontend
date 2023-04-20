import axios from 'axios';
import {
    FETCH_MEMBER_STARTED,
    FETCH_MEMBER_SUCCEEDED,
    FETCH_MEMBER_FAILED
} from '../constants/memberConstant';


export const fetchMemberStarted = () => ({
    type: FETCH_MEMBER_STARTED
})
export const fetchMemberSucceeded = members => ({
    type: FETCH_MEMBER_SUCCEEDED,
    members
})
export const fetchMemberFailed = error => ({
    type: FETCH_MEMBER_FAILED,
    error
})

export const fetchMemberGroup = (cookies, groupId) => {
    return async dispatch => {
        try {
            dispatch(fetchMemberStarted())
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-member-group/' + groupId;

            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => dispatch(fetchMemberSucceeded(response.data))).catch((error) => dispatch(fetchMemberFailed(error.message)))
        } catch (error) {
            dispatch(fetchMemberFailed(error));
        }
    }
}

export const addMemberToAdminGroup = (cookies, userId, groupId) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/add-admin-group';
            axios({
                method: 'POST',
                url: requestURL,
                data: {
                    userId: userId, groupId: groupId
                },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => { console.log(error); });

        } catch (error) {
            console.log(error);
        }
    }
}

export const removeAdminToGroup = (cookies, userId, groupId) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/remove-admin-to-group';
            axios({
                method: 'POST',
                url: requestURL,
                data: {
                    userId: userId, groupId: groupId
                },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => { console.log(error); });

        } catch (error) {
            console.log(error);
        }
    }
}