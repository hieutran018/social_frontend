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