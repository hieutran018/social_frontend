import { baseURL } from '../../components/auth/auth';
import {
    FETCH_GROUP_STARTED,
    FETCH_GROUP_SUCCEEDED, FETCH_GROUP_FAILED, CREATE_GROUP, UPDATE_GROUP
} from '../constants/groupConstant';


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
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-group-joined';
            baseURL.get('/api/v1/fetch-group-joined', {
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
            // const requestURL = 'https://ckcsocial.site/api/v1/create-group';
            baseURL.post('/api/v1/create-group', {
                groupName: groupName, privacy: privacy
            }, {
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
            // const requestURL = 'https://ckcsocial.site/api/v1/edit-information-group';
            baseURL.post('/api/v1/edit-information-group', {
                groupId: groupId, groupName: groupName, privacy: privacy, file: file
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(updateGroup(response.data))
            }).catch((error) => console.log(error));

        } catch (error) {
            console.log(error);
        }
    }
}


