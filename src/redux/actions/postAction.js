import axios from 'axios'
import {
    FETCH_POST_STARTED,
    FETCH_POST_SUCCEEDED,
    FETCH_POST_FAILED,
    ADD_POST,
    ADD_POST_SUCCEEDED,
    ADD_POST_FAILED
} from '../constants/postConstant'

export const fetchPostStarted = () => ({
    type: FETCH_POST_STARTED
})

export const fetchPostSucceeded = posts => ({
    type: FETCH_POST_SUCCEEDED,
    posts
})

export const addNewPostFailed = error => ({
    type: ADD_POST_FAILED,
    error
})

export const addNewPostSucceeded = post => ({
    type: ADD_POST_SUCCEEDED,
    post
})

export const fetchPostFailed = error => ({
    type: FETCH_POST_FAILED,
    error
})

export const fetchPost = () => {
    return async dispatch => {
        dispatch(fetchPostStarted())

        try {
            // Axios is common, but also `fetch`, or your own "API service" layer
            const res = await axios.get('http://127.0.0.1:8000/api/fetch-post?page=1')

            dispatch(fetchPostSucceeded(res.data.data))
        } catch (err) {
            dispatch(fetchPostFailed(err))
        }
    }
}

export const addNewPost = (token, contentPost, files) => {
    return async dispatch => {
        try {
            const requestURL = "http://127.0.0.1:8000/api/v1/create-post";

            axios({
                method: 'POST', //you can set what request you want to be
                url: requestURL,
                data: { postContent: contentPost, files: files },
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((response) => { dispatch(addPost(response.data)); dispatch(addNewPostSucceeded(response.data)); dispatch(fetchPost()) }).catch((error) => addNewPostFailed(error.message));
        } catch (error) {
            dispatch(fetchPostFailed(error))
        }
    }
}

export const addPost = (post) => ({
    type: ADD_POST,
    post
})