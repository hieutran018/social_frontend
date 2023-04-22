import {
    FETCH_GROUP_STARTED,
    FETCH_GROUP_SUCCEEDED, FETCH_GROUP_FAILED, CREATE_GROUP, UPDATE_GROUP
} from '../constants/groupConstant';
import axios from 'axios';


export const fetchGroupStarted = () => ({
    type: FETCH_GROUP_STARTED
})
export const fetchGroupSucceeded = groups => ({
    type: FETCH_GROUP_SUCCEEDED,
    groups
})
export const fetchGroupFailed = error => ({
    type: FETCH_GROUP_FAILED,
    error
})
export const createGroup = group => ({
    type: CREATE_GROUP,
    group
})
export const updateGroup = group => ({
    type: UPDATE_GROUP,
    group
})


export const fetchGroup = (cookies) => {
    return async dispatch => {
        dispatch(fetchGroupStarted())

        try {
            // Axios is common, but also `fetch`, or your own "API service" layer
            const requestURL = 'http://127.0.0.1:8000/api/v1/fetch-group-joined';
            axios({
                method: 'GET',
                url: requestURL,
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {

                dispatch(fetchGroupSucceeded(response.data[0].groups));

            }).catch((error) => dispatch(fetchGroupFailed(error.message)));
        } catch (err) {
            dispatch(fetchGroupFailed(err))
        }
    }
}

export const createNewGroup = (cookies, groupName, privacy) => {
    return async dispatch => {
        try {
            const requestURL = 'http://127.0.0.1:8000/api/v1/create-group';
            axios({
                method: 'POST',
                url: requestURL,
                data: { groupName: groupName, privacy: privacy },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {

                dispatch(createGroup(response.data));



            }).catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }
}

export const editGroup = (cookies, groupId, groupName, privacy, file) => {
    return async dispatch => {
        try {

            const requestURL = 'http://127.0.0.1:8000/api/v1/edit-information-group';
            axios({
                method: 'POST',
                url: requestURL,
                data: {
                    groupId: groupId, groupName: groupName, privacy: privacy, file: file
                },
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }

            }).then((response) => {

                dispatch(updateGroup(response.data))



            }).catch((error) => console.log(error));

        } catch (error) {

        }
    }
}


