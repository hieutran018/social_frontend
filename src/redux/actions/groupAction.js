import {
    FETCH_GROUP_STARTED,
    FETCH_GROUP_SUCCEEDED, FETCH_GROUP_FAILED, CREATE_GROUP
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
                console.log("FETCH GROUP?", response.data[0].groups)
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
                console.log("CREATE GROUP?", response.data)
                dispatch(createGroup(response.data));



            }).catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }
}


