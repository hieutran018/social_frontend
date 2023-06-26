import { baseURL } from '../../components/auth/auth';
import {
    FETCH_MEMBER_STARTED,
    FETCH_MEMBER_SUCCEEDED,
    FETCH_MEMBER_FAILED,
    UPDATE_MEMBER_GROUP,
    REMOVE_MEMBER_GROUP
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
export const updateMember = member => ({
    type: UPDATE_MEMBER_GROUP,
    member
})
export const removeMember = memberId => ({
    type: REMOVE_MEMBER_GROUP,
    memberId
})
export const fetchMemberGroup = (cookies, groupId) => {
    return async dispatch => {
        try {
            dispatch(fetchMemberStarted())
            // const requestURL = 'https://ckcsocial.site/api/v1/fetch-member-group/' + groupId;
            baseURL.get('/api/v1/fetch-member-group/' + groupId, {
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
            // const requestURL = 'https://ckcsocial.site/api/v1/add-admin-group';
            baseURL.post('/api/v1/add-admin-group', {
                userId: userId, groupId: groupId
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(updateMember(response.data))
            }).catch((error) => { console.log(error); });

        } catch (error) {
            console.log(error);
        }
    }
}

export const removeAdminToGroup = (cookies, userId, groupId) => {
    return async dispatch => {
        try {
            // const requestURL = 'https://ckcsocial.site/api/v1/remove-admin-to-group';
            baseURL.post('/api/v1/remove-admin-to-group', {
                userId: userId, groupId: groupId
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                dispatch(updateMember(response.data))
            }).catch((error) => { console.log(error); });

        } catch (error) {
            console.log(error);
        }
    }
}

export const removeMemberFromGroup = (cookies, memberId, groupId) => {
    return async dispatch => {
        try {
            // const requestURL = 'https://ckcsocial.site/api/v1/remove-member-from-group';
            baseURL.post('/api/v1/remove-member-from-group', {
                userId: memberId, groupId: groupId
            }, {
                headers: {
                    Authorization: 'Bearer ' + cookies,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => {
                console.log(response.data);
                dispatch(removeMember(memberId));
            }).catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }
}